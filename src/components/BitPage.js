import React from 'react';
import ContractInterface from './contractInterface';
import ABI from './Abi';
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {

    state = {
      page: 'bit',
    }

    acceptMethods = (createTicket, bitstudioRequestResetContract) => {
      // Parent stores the method that the child passed
      this.createTicket = createTicket;
      this.bitstudioRequestResetContract = bitstudioRequestResetContract;
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

    requestResetContract = () => {
        this.bitstudioRequestResetContract().on("receipt", (receipt) => {
            // console.log(receipt);
            const dataOpen = receipt.events.resetContractSessionOpeningEvent;
            if(dataOpen !== undefined) {
                const data = dataOpen.returnValues;
                console.log(data[2]);
                console.log('sender: ', data[0], 'reseting time: ', data[1]);
            } else {
                const data = receipt.events.resetContractSessionEndingEvent.returnValues;
                console.log(data[1]);
                console.log('sender: ', data[0]);
            }
        }).on("error", (error) => console.log(error));
    }


    render() {
        return (
            <div>
                <h1>Bit Dashboard</h1>
                <form onSubmit={(e) => {this.sending(e, this.createTicket)}}>
                    <input type='text' name="seed"/>
                    <button>create ticket</button>
                </form>
                <button onClick={this.requestResetContract}>Request Rest By Bitstudio</button>
                <Link to="/pizza">
                  <button>Go to PizzaPage</button>
                </Link>

                <h1>Ticket Information</h1>
                <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.state.page}/>
            </div>
        );
    }

};
