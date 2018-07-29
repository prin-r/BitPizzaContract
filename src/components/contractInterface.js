import React from 'react';
import Web3 from 'web3';
import abi from './Abi';
import getWeb3 from '../utils/getWeb3';
import TicketForm from './ticketForm';

export default class ContractInterface extends React.Component {

    state = {
        web3: null,
        contractAddress :'0x231bfF50577615492146F40A9e64D366E9662D95',
        contract : null,
        userAccount: null,
    };

    componentWillMount() {
        getWeb3.then((result) => {
            const web3 = result.web3;
            web3.eth.getAccounts().then((result) => {
                console.log(result[0]);
                web3.eth.defaultAccount = result[0];

                this.setState({
                    contract : new web3.eth.Contract(abi, this.state.contractAddress),
                    userAccount: result[0]
                });
            });
        });
    };

    testSha3 = (str) => {
        return (this.state.contract)? this.state.contract.methods.testSha3(str).call() : null;
    };

    numCreatedTickets = () => {
        return (this.state.contract)? this.state.contract.methods.numCreatedTickets().call() : null;
    };

    numClaimedTickets = () => {
        return (this.state.contract)? this.state.contract.methods.numClaimedTickets().call() : null;
    };

    createPizzaTicket = (str) => {
        return (this.state.contract)? this.state.contract.methods.createPizzaTicket(str).send({ from: this.state.userAccount }) : null;
    };

    claimTicket = (str) => {
        return (this.state.contract)? this.state.contract.methods.claimTicket(str).send({ from: this.state.userAccount }) : null;
    }

    asking = (e,func) => {
        e.preventDefault();
        const action  = func;
        if (action) {
            action.then( (result) => {
                console.log(result);
            }).catch(() => {
                console.log('result error');
            });
        }
        else {
            console.log('action error');
        }
    };

    sending = (e, func) => {
        e.preventDefault();
        const strInput = e.target.seed.value.trim();
        if (strInput && strInput !== "") {
            const action  = func(strInput);
            if (action) {
                action.on("receipt", (receipt) => {
                    console.log("Successfully");
                    // Transaction was accepted into the blockchain, let's redraw the UI
                    })
                    .on("error", (error) => {
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

    testing = (e) => {
        e.preventDefault();
        if (e.target.seed) {
            const str = e.target.seed.value.trim();
            console.log(str);
        }
        else {
            console.log("error");
        }
    }

    render() {
        return (
            <div>
                <button onClick={(e) => {this.asking(e,this.numClaimedTickets())}}>check claimed</button>
                <button onClick={(e) => {this.asking(e,this.numCreatedTickets())}}>check created</button>

                <form onSubmit={(e) => {this.sending(e,this.createPizzaTicket)}}>
                    <input type='text' name="seed"/>
                    <button>create ticket</button>
                </form>

                <form onSubmit={(e) => {this.sending(e,this.claimTicket)}}>
                    <input type='text' name="seed"/>
                    <button>claim ticket</button>
                </form>

            </div>
        );
    };
}
