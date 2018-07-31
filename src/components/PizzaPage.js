import React from 'react';
import ContractInterface from './contractInterface';
import { Link } from 'react-router-dom';

export default class BitPage extends React.Component {

    state = {
      page: 'pizza',
      numCreatedTickets: 0,
      numClaimedTickets: 0,
    };

    acceptMethods = (claimTicket, pizzaSellerRequestForResetContract) => {
      // Parent stores the method that the child passed
      this.claimTicket = claimTicket;
      this.pizzaSellerRequestForResetContract = pizzaSellerRequestForResetContract;
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

    requestResetContract = () => {
        this.pizzaSellerRequestForResetContract().on("receipt", (receipt) => {
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
                  <h1 className="header__title">Pizza Dashboard</h1>
                  <h2 className="header__subtitle">Smart Contract for pizza</h2>
                </div>
              </div>
              <div className="body">
                <div className="container">
                  <ContractInterface shareMethods={this.acceptMethods} pageFromParent={this.state.page}/>
                  <div className="row justify-content-md-center body-bar">
                    <div className="col">
                      <form className="form-inline" onSubmit={(e) => {this.sending(e, this.claimTicket)}}>
                          <label>Create Ticket</label>
                          <input type='text' className="form-control" placeholder="Enter password" name="seed"/>
                          <button className="btn btn-primary btn-lg" >Claim ticket</button>
                      </form>
                    </div>
                    <div className="col">
                      <button className="btn btn-primary btn-lg" onClick={this.requestResetContract}>Request Rest By Pizza</button>
                    </div>
                    <div className="col">
                      <Link to="/">
                        <button className="btn btn-primary btn-lg">Go to BitstudioPage</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }

};
