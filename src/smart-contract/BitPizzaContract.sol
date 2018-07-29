pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BitPizzaContract is Ownable {
    
    using SafeMath for uint32;
    
    uint32 public numCreatedTickets = 0;
    uint32 public numClaimedTickets = 0;
    
    mapping (bytes32 => bool) private tickets;
    
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
    
    function createTicket(bytes32 _bytesSeed) public onlyBitStudio() {
        require(! tickets[_bytesSeed]);
        
        tickets[_bytesSeed] = true;
        numCreatedTickets = numCreatedTickets.add(1);
        
        emit createTicketEvent(numCreatedTickets, numClaimedTickets, "creation successful");
    }
    
    function claimTicket(string _nakeSeed) public onlyPizzaSeller() onlyProperString(_nakeSeed) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        
        require(tickets[bytesSeed]);
        
        tickets[bytesSeed] = false;
        numClaimedTickets = numClaimedTickets.add(1);
        
        emit claimTicketEvent(numCreatedTickets, numClaimedTickets, "claiming successful");
    }
    
    function ticketStatus(string _nakeSeed) public view onlyProperString(_nakeSeed) returns(bool) {
        bytes32 bytesSeed = keccak256(bytes(_nakeSeed));
        return tickets[bytesSeed];
    }
}