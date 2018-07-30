import React from 'react';
import Web3 from 'web3';
import abi from './Abi';
import getWeb3 from '../utils/getWeb3';

export default class ContractInterface extends React.Component {

    state = {
        // web3: null,
        contractAddress :'0x0202eb09c733ee905a2168398ae831f25bdd2c6e',
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
          this.state.contract.methods.ticketsStatus().call().then(result => {
            console.log('created -->', result[0], '  claimed --> ', result[1]);
          }).catch(err => {
            console.log(err);
          });
        }
    };

    checkTicketStatus = (e) => {
        e.preventDefault();
        console.log('check ticket status');
        const value = e.target.seed.value;
        if (this.state.contract) {
          this.state.contract.methods.checkticketStatus(value).call().then(result => {
            console.log('result ',result);
          }).catch(err => {
            console.log(err);
          });
        }
    }

    checkingResetStatus = () => {
        console.log('check reset status');
        if (this.state.contract) {
          this.state.contract.methods.checkingResetStatus().call().then(result => {
            console.log(result[2]);
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
            <div className="container">
                {/*<h1>Page is {this.props.pageFromParent}</h1>*/}
                <div className="row">
                  <div className="col">
                    <div className="p-3 mb-2 bg-secondary text-white">Created Ticket: {this.state.numCreatedTickets}</div>
                  </div>
                  <div className="col">
                    <div className="p-3 mb-2 bg-secondary text-white">Claimed Ticket: {this.state.numClaimedTickets}</div>
                  </div>
                </div>

                <div className="btn-group" role="group" aria-label="Check Ticket Status">
                  <button type="button" className="btn btn-primary" onClick={(e) => {this.checkingResetStatus(e)}}>CheckResetStatus</button>
                  <button type="button" className="btn btn-primary" onClick={(e) => {this.getTicketsStat(e)}}>CheckCreated</button>
                </div>

                <form onSubmit={(e) => {this.checkTicketStatus(e)}}>
                  <label>Check Ticket Status</label>
                  <input type='text' className="form-control" aria-describedby="checkHelp" placeholder="Enter Key" name="seed"/>
                  <button className="btn btn-primary">Check Status</button>
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
