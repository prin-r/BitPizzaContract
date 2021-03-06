import React from 'react';
import Web3 from 'web3';
import abi from './Abi';
import getWeb3 from '../utils/getWeb3';

export default class ContractInterface extends React.Component {

    state = {
        // web3: null,
        contractAddress :'0xaec0108dc2407190316cb011efd2c75ebf0d3bde',
        contract : null,
        userAccount: null,
        numCreatedTickets: 0,
        numClaimedTickets: 0,
    };

    componentWillMount() {
        getWeb3.then((result) => {
            const web3 = result.web3;
            web3.eth.getAccounts().then((result) => {
                if(result[0] == undefined) alert('Please Login MetaMask.');
                console.log(result[0]);
                web3.eth.defaultAccount = result[0];

                this.setState({
                    contract : new web3.eth.Contract(abi, this.state.contractAddress),
                    userAccount: result[0]
                });
            });
        });
    };

    componentDidMount() {
      // Child passes its method to the parent
      if(this.props.pageFromParent === 'bit') this.props.shareMethods(this.createTicket.bind(this), this.bitstudioRequestResetContract.bind(this));
      else if(this.props.pageFromParent === 'pizza') this.props.shareMethods(this.claimTicket.bind(this), this.pizzaSellerRequestForResetContract.bind(this));
      else console.log('Didn\'t pass any function!')
    }

    testSha3 = (str) => {
        return (this.state.contract)? this.state.contract.methods.testSha3(str).call() : null;
    };

    getTicketsStat = () => {
        console.log("get Ticket Stat");
        if (this.state.contract) {
          this.state.contract.methods.getTicketsAndPackageStatus().call().then(result => {
            console.log('packageIndex -->', result[0], '  numCreate --> ', result[1],'  numClaim --> ', result[2]);
          }).catch(err => {
            console.log(err);
          });
        }
    };

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
    }

    getResetingStatus = () => {
        console.log('check reset status');
        if (this.state.contract) {
          this.state.contract.methods.getResetingStatus().call().then(result => {
            console.log('now -->', result[1], 'resetting time --> ', result[0],'bit --> ', result[2], 'pizza -->', result[3], result[4]);
          }).catch(err => {
            console.log(err);
          });
        }
    }

    setResetingSessionDuration = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.seed.value);
        if (this.state.contract && Number.isInteger(value)) {
            console.log('want to set new resseting duration');
            this.state.contract.methods.setResetingSessionDuration(value).send({ from: this.state.userAccount })
            .on('receipt', (receipt) => {
              const data = receipt.events.setNewDurationEvent.returnValues;
              console.log('sender: ', data[0], ' duration: ', data[1]);
            }).on('error', err => console.log(err));
        } else {
            console.log('error! input must be an integer');
        }
    }

    // For Bitstudio Page
    createTicket = (str) => {
        const hash = Web3.utils.soliditySha3(str);
        console.log('Want to create Pizza ', hash);
        return (this.state.contract)? this.state.contract.methods.createTicket(hash).send({ from: this.state.userAccount }) : null;
    };

    bitstudioRequestResetContract = () => {
        console.log('Bit want to reset');
        return (this.state.contract) ? this.state.contract.methods.bitstudioRequestResetContract().send({ from: this.state.userAccount}) : null;
    }

    // For Pizza Page
    claimTicket = (str) => {
        console.log('want to claim pizza!!');
        return (this.state.contract)? this.state.contract.methods.claimTicket(str).send({ from: this.state.userAccount }) : null;
    };

    pizzaSellerRequestForResetContract = () => {
        console.log('Pizza want to reset');
        return (this.state.contract) ? this.state.contract.methods.pizzaSellerRequestForResetContract().send({ from: this.state.userAccount}) : null;
    }



    render(props) {
        return (
            <div>
                <h2>Page is {this.props.pageFromParent}</h2>
                <p>Created Ticket {this.state.numCreatedTickets}</p>
                <p>Claimed Ticket {this.state.numClaimedTickets}</p>
                <button onClick={(e) => {this.getResetingStatus(e)}}>CheckResetStatus</button>
                <button onClick={(e) => {this.getTicketsStat(e)}}>CheckTotalTicket</button>
                <form onSubmit={(e) => {this.getATicketStatus(e)}}>
                    <label>Check Ticket Status</label>
                    <input type='text' name="seed"/>
                    <button>Check</button>
                </form>
                <form onSubmit={(e) => {this.setResetingSessionDuration(e)}}>
                    <label>Set New Reseting Duration</label>
                    <input type='text' name="seed"/>
                    <button>Set</button>
                </form>

            </div>
        );
    };
}
