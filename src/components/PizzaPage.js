import React from 'react';
import ContractInterface from './contractInterface';
import { Link } from 'react-router-dom';

import TicketsStatus from './ticketsStatus';
import ResettingStatus from './resettingStatus';
import SetResetingSessionDuration from './SetResetingSessionDuration';
import ATicketStatus from './ATicketStatus';

export default class BitPage extends React.Component {

    state = {
      page: 'pizza',
      numCreatedTickets: 0,
      numClaimedTickets: 0
    };

    acceptMethods = (allFuncs) => {
      // Parent stores the method that the child passed
      this.setState( allFuncs );
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
<<<<<<< HEAD
                  <div className="row justify-content-md-center body-bar">
                    <div className="col">
                      <form className="form-inline" onSubmit={(e) => {this.sending(e, this.claimTicket)}}>
                          <label>Create Ticket</label>
                          <input type='text' className="form-control" placeholder="Enter password" name="seed"/>
=======
                  <div className="container_inside">
                    <div>
                      <TicketsStatus content={this.state.getTicketsStat} />
                      <ResettingStatus content={this.state.getResetingStatus} />
                    </div>
                    <div className="row justify-content-md-center ">
                      <ATicketStatus content={this.state.getATicketStatus}/>
                      <SetResetingSessionDuration
                        content={({
                          resetFunc: this.state.setResetingSessionDuration,
                          getTimeFunc: this.state.getTimeStatus
                        })}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-md-center body-bar">
                    <div className="col">
                      <form className="form-inline" onSubmit={(e) => {this.sending(e, this.state.claimTicket)}}>
                          <label>Create Ticket</label>
                          <input type='text' className="form-control" placeholder="Enter new key" name="seed"/>
>>>>>>> efaee45abc75e741545de6853ba6beb40141549e
                          <button className="btn btn-primary btn-lg" >Claim ticket</button>
                      </form>
                    </div>
                    <div className="col">
<<<<<<< HEAD
                      <button className="btn btn-primary btn-lg" onClick={this.requestResetContract}>Request Rest By Pizza</button>
=======
                      <button className="btn btn-primary btn-lg" onClick={this.state.requestResetContract}>Request Rest By Pizza</button>
>>>>>>> efaee45abc75e741545de6853ba6beb40141549e
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
