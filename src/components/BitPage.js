import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi';
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {

    state = {
      page: 'bit',
    }

    acceptMethods = (createTicket) => {
      // Parent stores the method that the child passed
      this.createTicket = createTicket;
    };

    sending = (e,func) => {
        e.preventDefault();
        const strInput = e.target.seed.value.trim();
        if (strInput && strInput !== "") {
            const action  = func(strInput);
            if (action) {
                action.on("receipt", (receipt) => {
                  // console.log(receipt);
                  const data = receipt.events.createTicketEvent.returnValues;
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
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col-md-6 col-md-offset-2">
                  <h1 className="display-4">Bitstudio Dashboard</h1>
                  <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.state.page}/>
                  <form onSubmit={(e) => {this.sending(e, this.createTicket)}}>
                      <input type='text' name="seed"/>
                      <button>create ticket</button>
                  </form>
                  <Link to="/pizza">
                    <button>Go to PizzaPage</button>
                  </Link>
                </div>
              </div>
            </div>
        );
    }

};
