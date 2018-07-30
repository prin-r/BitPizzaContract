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
              <div className="header">
                <div className="container">
                  <h1 className="header__title">Bitstudio Dashboard</h1>
                  <h2 className="header__subtitle">Smart Contract for pizza</h2>
                </div>
              </div>
              <div className="body">
                <div className="container">
                  <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.state.page}/>
                  <div className="row justify-content-md-center body-bar">
                    <div className="col">
                      <form className="form-inline" onSubmit={(e) => {this.sending(e, this.createTicket)}}>
                          <label>Create Ticket</label>
                          <input type='text' className="form-control" placeholder="Enter password" name="seed"/>
                          <button className="btn btn-primary btn-lg" >create ticket</button>
                      </form>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary btn-lg" onClick={this.requestResetContract}>Request Rest By Bitstudio</button>
                    </div>
                    <div className="col">
                      <Link to="/pizza">
                        <button className="btn btn-primary btn-lg">Go to PizzaPage</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }

};
