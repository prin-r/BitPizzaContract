import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi';
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {
    state = {
        // count: 0
    };

    render() {
        return (
            <div>
                <h1>Bit Dashboard</h1>


                <Link to="/pizza">
                  <button>Go to PizzaPage</button>
                </Link>
            </div>
        );
    }

};
