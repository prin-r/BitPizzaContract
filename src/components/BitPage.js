import React from 'react';
import { Link } from 'react-router-dom';

import ContractInterface from './ContractInterface';
import TicketsStatus from './TicketsStatus';
import ResettingStatus from './ResettingStatus';
import TimeStatus from './TimeStatus';
import ContractActionForm from './ContractActionForm';

export default class BitPage extends React.Component {

    state = {
      page: 'bit'
    }

    acceptMethods = (allFuncs) => {
      // Parent stores the method that the child passed
      this.setState( allFuncs );
    };

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
                  <div className="container_inside">
                    <div>
                      <TicketsStatus content={this.state.getTicketsStat} />
                      <ResettingStatus content={this.state.getResetingStatus} />
                    </div>
                    <div className="row justify-content-md-center ">
                      <ContractActionForm content={this.state.getATicketStatus} name={"check a ticket"} placeholder={"key"}/>
                      <TimeStatus content={this.state.getTimeStatus}/>
                      <ContractActionForm content={this.state.setResetingSessionDuration} name={"set duration"} placeholder={"new duration"}/>
                    </div>
                  </div>
                  <div className="row justify-content-md-center body-bar">
                    
                    <ContractActionForm content={this.state.createTicket} name={"create ticket"} placeholder={"new key"}/>

                    <div className="col">
                      <button className="btn btn-primary btn-lg" onClick={this.state.requestResetContract}>Request Rest By Bitstudio</button>
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
