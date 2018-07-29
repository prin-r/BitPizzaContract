pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BitPizzaContract is Ownable {
    
    using SafeMath for uint32;
    
    uint32 public numCreatedTickets = 0;
    uint32 public numClaimedTickets = 0;
    
    mapping (string => bool) private tickets;
    
    event createTicketEvent(uint32 _numCreatedTickets, uint32 _numClaimedTickets, string _message);
    event claimTicketEvent(uint32 _numCreatedTickets, uint32 _numClaimedTickets, string _message);
    
    modifier onlyProperString(string _s) {
        uint lenRN = bytes(_s).length;
        require(lenRN > 0 && lenRN <= 32);
        _;
    }
    
    function testKeccak(string _s) public pure returns(bytes32, uint16) {
        bytes32 result = keccak256(bytes(_s));
        return (result, result.length);
    }
    
    function testByte2String(bytes32 _bytes32) public pure returns(string) {
        string memory b2s = bytes32ToString(_bytes32);
        return (b2s);
    }
    
    function testString2Bytes(string _nakeSeed) public pure returns(bytes32,string) {
        bytes32 seed = keccak256(bytes(_nakeSeed));
        string memory b2s = bytes32ToString(seed);
        return (seed,b2s);
    }
    
    function bytes32ToString(bytes32 x) private pure returns (string) {
        bytes memory bytesArray = new bytes(32);
        for (uint16 i; i < 32; i++) {
            bytesArray[i] = x[i];
        }
        return string(bytesArray);
    }
    
    function createTicket(bytes32 _bytesSeed) public onlyBitStudio() {
        string memory seed = bytes32ToString(_bytesSeed);
        require(! tickets[seed]);
        
        tickets[seed] = true;
        numCreatedTickets = numCreatedTickets.add(1);
        
        emit createTicketEvent(numCreatedTickets, numClaimedTickets, "creation successful");
    }
    
    function claimTicket(string _nakeSeed) public onlyPizzaSeller() onlyProperString(_nakeSeed) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        string memory seed = bytes32ToString(bytesSeed);
        
        require(tickets[seed]);
        
        tickets[seed] = false;
        numClaimedTickets = numClaimedTickets.add(1);
        
        emit claimTicketEvent(numCreatedTickets, numClaimedTickets, "claiming successful");
    }
    
    function ticketStatus(string _nakeSeed) public view onlyProperString(_nakeSeed) returns(bool) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        string memory seed = bytes32ToString(bytesSeed);
        return tickets[seed];
    }
}