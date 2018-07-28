pragma solidity ^0.4.24;
contract BitPizzaContract {

    address private bitStudio;

    uint public numCreatedTickets = 0;
    uint public numClaimedTickets = 0;

    mapping (bytes32 => bool) private tickets;

    constructor() public {
        bitStudio = msg.sender;
    }

    function verifyString(string _s) private pure {
        uint lenRN = bytes(_s).length;
        require(lenRN > 0 && lenRN < 512);
    }

    function createPizzaTicket(string _seed) public returns(string) {
        require(msg.sender == bitStudio);
        verifyString(_seed);

        bytes32 hashedSeed = keccak256(bytes(_seed));

        tickets[hashedSeed] = true;
        numCreatedTickets += 1;

        return 'creation successful';
    }

    function claimTicket(string _seed) public returns(string) {
        verifyString(_seed);

        bytes32 hashedSeed = keccak256(bytes(_seed));
        require(tickets[hashedSeed]);

        tickets[hashedSeed] = false;
        numClaimedTickets += 1;
        return 'claiming successful';
    }

    function ticketStatus(string _seed) public view returns(bool) {
        verifyString(_seed);
        bytes32 hashedSeed = keccak256(bytes(_seed));

        return tickets[hashedSeed];
    }
}