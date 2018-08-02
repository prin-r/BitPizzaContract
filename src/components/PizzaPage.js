import React from 'react';
import { Link } from 'react-router-dom';

import ContractInterface from './ContractInterface';
import TicketsStatus from './TicketsStatus';
import ResettingStatus from './ResettingStatus';
import TimeStatus from './TimeStatus';
import ContractActionForm from './ContractActionForm';
import ContractActionButton from './ContractActionButton';

export default class BitPage extends React.Component {

    state = {
      page: 'pizza',

    };

    acceptMethods = (allFuncs) => {
      // Parent stores the method that the child passed
      this.setState( allFuncs );
    };

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
                    <ContractActionForm  content={this.state.claimTicket}  name={"claim ticket"} placeholder={"key"}/>
                    <ContractActionButton content={this.state.pizzaSellerRequestForResetContract} message="Request Rest By Pizza" />
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
