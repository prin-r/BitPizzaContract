import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi'

export default class BitPizzaApp extends React.Component {
    state = {
        count: 0
    };
    
    render() {
        return (
            <div>
                <ContractInterface />
                <div>{this.state.count}</div>
            </div>
        );
    }
    
};
