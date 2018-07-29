pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BitPizzaContract is Ownable {

    using SafeMath for uint32;
    using SafeMath for uint64;

    bool private bitStudioRequestForReset = false;
    bool private pizzaSellerRequestForReset = false;

    uint32 private numClaimedTickets = 0;

    bytes32[] private ticketsKeyTracker;
    mapping (bytes32 => bool) private tickets;

    uint64 public resetingTime = uint64(now);
    uint64 public waitingDuration = uint64(1 minutes);
    uint64 public maxDuration = uint64(1 days);

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

    function resetSessionOnly() private {
        bitStudioRequestForReset = false;
        pizzaSellerRequestForReset = false;
        resetingTime = uint64(now);
    }

    function resetContractState() private {
        numClaimedTickets = 0;

        for (uint i = 0; i < ticketsKeyTracker.length; i++) {
            if (tickets[ticketsKeyTracker[i]]) {
                tickets[ticketsKeyTracker[i]] = false;
            }
        }

        delete ticketsKeyTracker;

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
            if (now < resetingTime) {
               resetContractState();
            } else {
                resetSessionOnly();
                emit resetContractSessionEndingEvent(msg.sender, "fail to reset state of the contract");
            }
        } else if (! bitStudioRequestForReset) {
            bitStudioRequestForReset = true;
            resetingTime = waitingDuration.add64(uint64(now));
            emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "reseting session opening Bitstudio");
        } else {
            emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "fail! session was already opened");
        }
    }

    function pizzaSellerRequestForResetContract() public onlyPizzaSeller {
        if (bitStudioRequestForReset) {
            if (now < resetingTime) {
               resetContractState();
            } else {
                resetSessionOnly();
                emit resetContractSessionEndingEvent(msg.sender, "fail to reset state of the contract");
            }
        } else if (! pizzaSellerRequestForReset) {
            pizzaSellerRequestForReset = true;
            resetingTime = waitingDuration.add64(uint64(now));
            emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "reseting session opening by PizzaSeller");
        } else {
            emit resetContractSessionOpeningEvent(msg.sender, resetingTime, "fail! session was already opened");
        }
    }

    function createTicket(bytes32 _bytesSeed) public onlyBitStudio {
        require(! tickets[_bytesSeed]);

        tickets[_bytesSeed] = true;
        ticketsKeyTracker.push(_bytesSeed);

        emit createTicketEvent(uint32(ticketsKeyTracker.length), numClaimedTickets, "creation successful");
    }

    function claimTicket(string _nakeSeed) public onlyPizzaSeller onlyProperString(_nakeSeed) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));

        require(tickets[bytesSeed]);

        tickets[bytesSeed] = false;
        numClaimedTickets = numClaimedTickets.add32(1);

        emit claimTicketEvent(uint32(ticketsKeyTracker.length), numClaimedTickets, "claiming successful");
    }

    function checkingResetStatus() public view returns(uint64, bool, string) {
        bool isResetingSessionOpened = now < resetingTime;
        string memory message = (isResetingSessionOpened)? "opening" : "closed";
        return (resetingTime, isResetingSessionOpened, message);
    }

    function checkticketStatus(string _nakeSeed) public view onlyProperString(_nakeSeed) returns(bool) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        return tickets[bytesSeed];
    }

    function ticketsStatus() public view returns(uint32, uint32) {
        return (uint32(ticketsKeyTracker.length), numClaimedTickets);
    }
}
