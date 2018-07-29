pragma solidity ^0.4.24;

library SafeMath {
    
    //------------- uint32
    
    function mul32(uint32 a, uint32 b) internal pure returns (uint32) {
        if (a == 0) {
            return 0;
        }
        uint32 c = a * b;
        assert(c / a == b);
        return c;
    }
    
    function div32(uint32 a, uint32 b) internal pure returns (uint32) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        uint32 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }
      
    function sub32(uint32 a, uint32 b) internal pure returns (uint32) {
        assert(b <= a);
        return a - b;
    }
    
    function add32(uint32 a, uint32 b) internal pure returns (uint32) {
        uint32 c = a + b;
        assert(c >= a);
        return c;
    }
    
    //------------- uint64
    
    function sub64(uint64 a, uint64 b) internal pure returns (uint64) {
        assert(b <= a);
        return a - b;
    }
    
    function add64(uint64 a, uint64 b) internal pure returns (uint64) {
        uint64 c = a + b;
        assert(c >= a);
        return c;
    }
}