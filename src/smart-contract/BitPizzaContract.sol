pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./Ownable.sol";

contract BitPizzaContract is Ownable {
    
    using SafeMath for uint32;
    
    uint32 public numCreatedTickets = 0;
    uint32 public numClaimedTickets = 0;
    
    mapping (string => bool) private tickets;
    
    function keccak(string _s) public pure returns(bytes32, uint16) {
        bytes32 result = keccak256(bytes(_s));
        return (result, result.length);
    }
    
    function bytes32ToString(bytes32 x) public pure returns (string) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    
    modifier onlyProperString(string _s) {
        uint lenRN = bytes(_s).length;
        require(lenRN > 0 && lenRN < 128);
        _;
    }
    
    function createPizzaTicket(string _seed) public onlyBitStudio() onlyProperString(_seed) returns(string) {

        require(! tickets[_seed]);
        
        tickets[_seed] = true;
        numCreatedTickets.add(1);
        
        return "creation successful";
    }
    
    function claimTicket(string _nakeSeed) public  onlyPizzaSeller() onlyProperString(_nakeSeed) returns(string) {
        bytes32 seed = keccak256(bytes(_nakeSeed));
        
        string memory b2s = bytes32ToString(seed);
        
        require(tickets[b2s]);
        
        tickets[b2s] = false;
        numClaimedTickets.add(1);
        
        return "claiming successful";
    }
    
    function ticketStatus(string _seed) public view  onlyProperString(_seed) returns(bool) {
        return tickets[_seed];
    }
}