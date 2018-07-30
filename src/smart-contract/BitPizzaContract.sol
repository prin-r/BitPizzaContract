pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BitPizzaContract is Ownable {

    using SafeMath for uint32;
    using SafeMath for uint64;

    bool private bitStudioRequestForReset = false;
    bool private pizzaSellerRequestForReset = false;

    uint32 private numClaimedTickets = 0;
    uint32 private numCreatedTickets = 0;
    uint32 private currentPackageIndex = 0;
    
    uint64 private resetingTime = uint64(now);
    uint64 private waitingDuration = uint64(1 minutes);
    uint64 private maxDuration = uint64(1 days);
    
    mapping (uint32 => mapping (bytes32 => bool)) private packageOfTickets;
    
    event createTicketEvent(uint32 _numCreatedTickets, uint32 _numClaimedTickets, string _message);
    event claimTicketEvent(uint32 _numCreatedTickets, uint32 _numClaimedTickets, string _message);

    event setNewDurationEvent(address _sender, uint64 _newDuration);
    event resetContractSessionOpeningEvent(address _sender, uint64 _endingTime, string message);
    event resetContractSessionEndingEvent(address _sender, string message);

    modifier onlyProperString(string _s) {
        uint lenRN = bytes(_s).length;
        require(lenRN > 0 && lenRN <= 32);
        _;
    }

    function testKeccak(string _s) public pure returns(bytes32, uint16) {
        bytes32 result = keccak256(bytes(_s));
        return (result, result.length);
    }
    
    function tryToCloseResetingSession() private {
        if (now < resetingTime) {
            resetContractState();
        } else {
            resetSessionOnly();
            emit resetContractSessionEndingEvent(msg.sender, "timeout! fail session was closed");
        }
    }
    
    function resetSessionOnly() private {
        bitStudioRequestForReset = false;
        pizzaSellerRequestForReset = false;
        resetingTime = uint64(now);
    }

    function resetContractState() private {
        numClaimedTickets = 0;
        numCreatedTickets = 0;
        currentPackageIndex = currentPackageIndex.add32(1);
        resetSessionOnly();
        emit resetContractSessionEndingEvent(msg.sender, "state of the contract was successfully reset");
    }

    function setResetingSessionDuration(uint64 _duration) public bitStudioOrPizzaSeller {
        require(0 < _duration && _duration <= maxDuration);
        waitingDuration = _duration;
        emit setNewDurationEvent(msg.sender, _duration);
    }

    function bitstudioRequestResetContract() public onlyBitStudio {
        if (pizzaSellerRequestForReset) {
            tryToCloseResetingSession();
        } else {
            if (bitStudioRequestForReset) {
                if (now < resetingTime) {
                    emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "fail! waiting for PizzaSeller or timeout");
                } else {
                    resetSessionOnly();
                    emit resetContractSessionEndingEvent(msg.sender, "timeout! fail session was closed");
                }
            } else {
                bitStudioRequestForReset = true;
                resetingTime = waitingDuration.add64(uint64(now));
                emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "reseting session opening Bitstudio");
            }
        }
    }
    
    function pizzaSellerRequestForResetContract() public onlyPizzaSeller {
        if (bitStudioRequestForReset) {
            tryToCloseResetingSession();
        } else {
            if (pizzaSellerRequestForReset) {
                if (now < resetingTime) {
                    emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "fail! waiting for Bitstudio or timeout");
                } else {
                    resetSessionOnly();
                    emit resetContractSessionEndingEvent(msg.sender, "timeout! fail session was closed");
                }
            } else {
                pizzaSellerRequestForReset = true;
                resetingTime = waitingDuration.add64(uint64(now));
                emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "reseting session opening by PizzaSeller");
            }
        }
    }

    function createTicket(bytes32 _bytesSeed) public onlyBitStudio {
        require(! packageOfTickets[currentPackageIndex][_bytesSeed]);
        
        packageOfTickets[currentPackageIndex][_bytesSeed] = true;
        numCreatedTickets = numCreatedTickets.add32(1);
        
        emit createTicketEvent(numCreatedTickets, numClaimedTickets, "creation successful");
    }

    function claimTicket(string _nakeSeed) public onlyPizzaSeller onlyProperString(_nakeSeed) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        
        require(packageOfTickets[currentPackageIndex][bytesSeed]);
        
        packageOfTickets[currentPackageIndex][bytesSeed] = false;
        numClaimedTickets = numClaimedTickets.add32(1);
        
        emit claimTicketEvent(numCreatedTickets, numClaimedTickets, "claiming successful");
    }
    
    function getResetingStatus() external view bitStudioOrPizzaSeller returns(uint64, uint64, bool, bool, string) {
        string memory message = (now < resetingTime)? "opening" : "closed";
        return (resetingTime, uint64(now), bitStudioRequestForReset, pizzaSellerRequestForReset, message);
    }
    
    function getTimeStatus() external view bitStudioOrPizzaSeller returns(uint64, uint64, uint64, uint64) {
        return (uint64(now), resetingTime, maxDuration, waitingDuration);
    }
    
    function getATicketStatus(string _nakeSeed) external view bitStudioOrPizzaSeller onlyProperString(_nakeSeed) returns(bool) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        return packageOfTickets[currentPackageIndex][bytesSeed];
    }
    
    function getTicketsAndPackageStatus() external view bitStudioOrPizzaSeller returns(uint32, uint32, uint32) {
        return (currentPackageIndex ,numCreatedTickets, numClaimedTickets);
    }
}
