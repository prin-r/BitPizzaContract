import React from 'react';
import Web3 from 'web3';
import abi from './Abi';
import getWeb3 from '../utils/getWeb3';

export default class ContractInterface extends React.Component {

    state = {
        contractAddress :'0xaec0108dc2407190316cb011efd2c75ebf0d3bde',
        contract : null,
        userAccount: null,
    };

    componentDidMount = () => {
        getWeb3.then((result) => {
            const web3 = result.web3;
            web3.eth.getAccounts().then((result) => {
                if(result[0] == undefined) alert('Please Login MetaMask.');
                console.log(result[0]);
                web3.eth.defaultAccount = result[0];

                this.state.contract = new web3.eth.Contract(abi, this.state.contractAddress);
                this.state.userAccount = result[0];
            });
        });
        // Child passes its method to the parent
        this.props.shareMethods(this.getAllFuncs());
    }

    getAllFuncs = () => {
        return {
            testSha3 : this.testSha3,
            getTicketsStat : this.getTicketsStat,
            getTimeStatus : this.getTimeStatus,
            getResetingStatus : this.getResetingStatus,
            getATicketStatus : this.getATicketStatus,
            setResetingSessionDuration : this.setResetingSessionDuration,
            createTicket : this.createTicket,
            claimTicket : this.claimTicket,
            bitstudioRequestResetContract : this.bitstudioRequestResetContract,
            pizzaSellerRequestForResetContract : this.pizzaSellerRequestForResetContract
        };
    }

    testSha3 = (str) => {
        return (this.state.contract)? this.state.contract.methods.testSha3(str).call() : null;
    };

    getTicketsStat = () => {
        return (this.state.contract) ? this.state.contract.methods.getTicketsAndPackageStatus().call() : undefined;
    };

<<<<<<< HEAD
    getATicketStatus = (e) => {
        e.preventDefault();
        console.log('check ticket status');
        const value = e.target.seed.value;
        if (this.state.contract && value) {
          this.state.contract.methods.getATicketStatus(value).call().then(result => {
            console.log('result ',result);
          }).catch(err => {
            console.log(err);
          });
        }
=======
    getTimeStatus = () => {
        return (this.state.contract) ? this.state.contract.methods.getTimeStatus().call() : undefined;
>>>>>>> efaee45abc75e741545de6853ba6beb40141549e
    }

    getResetingStatus = () => {
        return (this.state.contract) ? this.state.contract.methods.getResetingStatus().call() : undefined;
    }

    getATicketStatus = (val) => {
        return (this.state.contract) ? this.state.contract.methods.getATicketStatus(val).call() : undefined;
    }

    setResetingSessionDuration = (val) => {
        return (this.state.contract) ? this.state.contract.methods.setResetingSessionDuration(val).send({ from: this.state.userAccount }) :  undefined;
    }

    // For Bitstudio Page
    createTicket = (str) => {
        const hash = Web3.utils.soliditySha3(str);
        console.log('request for a new ticket', hash);
        return (this.state.contract)? this.state.contract.methods.createTicket(hash).send({ from: this.state.userAccount }) : undefined;
    };

    bitstudioRequestResetContract = () => {
        console.log('resetting was stared by Bit');
        return (this.state.contract) ? this.state.contract.methods.bitstudioRequestResetContract().send({ from: this.state.userAccount}) : undefined;
    }

    // For Pizza Page
    claimTicket = (str) => {
        console.log('request for claiming a ticket');
        return (this.state.contract) ? this.state.contract.methods.claimTicket(str).send({ from: this.state.userAccount }) : undefined;
    };

    pizzaSellerRequestForResetContract = () => {
        console.log('resetting was start by Pizza');
        return (this.state.contract) ? this.state.contract.methods.pizzaSellerRequestForResetContract().send({ from: this.state.userAccount}) : undefined;
    }

<<<<<<< HEAD

    render(props) {
        return (
            <div className="container_inside">
              <div>
                <TicketsStatus content={this.getTicketsStat} />
                <ResettingStatus content={this.getResetingStatus} />
              </div>
              <div className="row justify-content-md-center ">
                <div className="col-md-auto">
                  <form className="form-inline" onSubmit={(e) => {this.getATicketStatus(e)}}>
                      <label>Check Ticket Status</label>
                      <input type='text' className="form-control" placeholder="Enter Key" name="seed"/>
                      <button className="btn btn-primary btn-lg">Check Status</button>
                  </form>
                </div>
                <div className="col-md-auto">
                  <form className="form-inline" onSubmit={(e) => {this.setResetingSessionDuration(e)}}>
                      <label>Set New Reseting Duration</label>
                      <input type='text' className="form-control" placeholder="Enter the new duration" name="seed"/>
                      <button className="btn btn-primary btn-lg">Set</button>
                  </form>
                </div>
              </div>
            </div>
        );
=======
    render() {
        return (null);
>>>>>>> efaee45abc75e741545de6853ba6beb40141549e
    };
}
