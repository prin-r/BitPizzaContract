import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi'
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {

    state = {
      page: 'pizza',
      numCreatedTickets: 0,
      numClaimedTickets: 0,
    };

    acceptMethods = (claimTicket) => {
      // Parent stores the method that the child passed
      this.claimTicket = claimTicket;
    };

    sending = (e,func) => {
        e.preventDefault();
        const strInput = e.target.seed.value.trim();
        if (strInput && strInput !== "") {
            const action  = func(strInput);
            if (action) {
                action.on("receipt", (receipt) => {
                  // console.log(receipt);
                  const data = receipt.events.claimTicketEvent.returnValues;
                  console.log(data[2]);
                  this.setState({numCreatedTickets: data[0], numClaimedTickets: data[1]});
                }).on("error", (error) => {
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
                <h1>Pizza Dashboard</h1>
                <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.state.page} />
                <form onSubmit={(e) => {this.sending(e, this.claimTicket)}}>
                    <input type='text' name="seed"/>
                    <button>claim ticket</button>
                </form>
                <Link to="/">
                  <button>Go to BitPage</button>
                </Link>
            </div>
        );
    }

};
