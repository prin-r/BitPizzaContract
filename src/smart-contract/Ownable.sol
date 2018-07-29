pragma solidity ^0.4.24;

contract Ownable {
    
    address public bitStudio;
    address public pizzaSeller;
    
    event OwnershipBitStudioTransferred(address indexed previousOwner, address indexed newOwner);
    event OwnershipPizzaSellerTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() public {
        bitStudio = msg.sender;
        pizzaSeller = msg.sender;
    }

    modifier onlyBitStudio() {
        require(msg.sender == bitStudio);
        _;
    }
    
    modifier onlyPizzaSeller() {
        require(msg.sender == pizzaSeller);
        _;
    }
    
    function transferBitStudioOwnership(address newOwner) public onlyBitStudio {
        require(newOwner != address(0));
        emit OwnershipBitStudioTransferred(bitStudio, newOwner);
        bitStudio = newOwner;
    }
    
    function transferPizzaSellerOwnership(address newOwner) public onlyPizzaSeller {
        require(newOwner != address(0));
        emit OwnershipPizzaSellerTransferred(pizzaSeller, newOwner);
        pizzaSeller = newOwner;
    }
}