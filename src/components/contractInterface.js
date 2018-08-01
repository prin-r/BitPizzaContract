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

    getTimeStatus = () => {
        return (this.state.contract) ? this.state.contract.methods.getTimeStatus().call() : undefined;
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

    render() {
        return (null);
    };
}
