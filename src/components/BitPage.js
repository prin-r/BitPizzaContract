import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi';
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {

    page = 'bit';

    acceptMethods = (createPizzaTicket) => {
      // Parent stores the method that the child passed
      this.createPizzaTicket = createPizzaTicket;
    };

    sending = (e,func) => {
        e.preventDefault();
        const strInput = e.target.seed.value.trim();
        if (strInput && strInput !== "") {
            const action  = func(strInput);
            if (action) {
                action.on("receipt", (receipt) => {
                    console.log("Successfully");
                    // Transaction was accepted into the blockchain, let's redraw the UI
                    })
                    .on("error", (error) => {
                    // Do something to alert the user their transaction has failed
                    console.log(error);
                });
            }
            else {
                console.log('action error');
            }
        }
        else {
            console.log('input is invalid');
        }
    }

    render() {
        return (
            <div>
                <h1>Bit Dashboard</h1>
                <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.page}/>
                <form onSubmit={(e) => {this.sending(e, this.createPizzaTicket)}}>
                    <input type='text' name="seed"/>
                    <button>create ticket</button>
                </form>
                <Link to="/pizza">
                  <button>Go to PizzaPage</button>
                </Link>
            </div>
        );
    }

};
