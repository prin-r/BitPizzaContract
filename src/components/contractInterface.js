import React from 'react';
import Web3 from 'web3';
import abi from './Abi';
import getWeb3 from '../utils/getWeb3';

export default class ContractInterface extends React.Component {

    state = {
        // web3: null,
        contractAddress :'0x5bd5171f95b8fdde4ec7d837f93cb03e273247af',
        contract : null,
        userAccount: null,
        numCreatedTickets: 0,
        numClaimedTickets: 0,
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

    componentDidMount() {
      // Child passes its method to the parent
      if(this.props.pageFromParent === 'bit') this.props.shareMethods(this.createTicket.bind(this));
      else if(this.props.pageFromParent === 'pizza') this.props.shareMethods(this.claimTicket.bind(this));
      else console.log('Didn\'t pass any function!')

    }

    testSha3 = (str) => {
        return (this.state.contract)? this.state.contract.methods.testSha3(str).call() : null;
    };

    getTicketsStat = () => {
        console.log("get Ticket Stat");
        return (this.state.contract)? this.state.contract.methods.ticketsStatus().call() : null;
    };

    createTicket = (str) => {
        const hash = Web3.utils.soliditySha3(str);
        console.log('Create Pizza ', hash);
        return (this.state.contract)? this.state.contract.methods.createTicket(hash).send({ from: this.state.userAccount }) : null;
    };

    claimTicket = (str) => {
        console.log('Claimed pizza!!');
        return (this.state.contract)? this.state.contract.methods.claimTicket(str).send({ from: this.state.userAccount }) : null;
    };
<<<<<<< HEAD

    // updateNum = (type) => {
    //   if(type === 'create') {
    //     const createTicketEvent = this.state.contract.createTicketEvent();
    //     createTicketEvent.watch((err, result) => {
    //       if(err) console.log(err);
    //       else console.log(result);
    //     })
    //
    //     // this.contract.events.createTicketEvent();
    //   }
    // };
=======
>>>>>>> 77fc173881a70ecbaa46e8c875d7ca7302342eb5

    asking = (e,func) => {
        e.preventDefault();
        const action  = func;
        if (action) {
            action.then( (result) => {
<<<<<<< HEAD
                console.log('created -->', result[0], '  claimed --> ', result[1]);
=======
                this.setState({ numCreatedTickets: result[0], numClaimedTickets: result[1] });
>>>>>>> 77fc173881a70ecbaa46e8c875d7ca7302342eb5
            }).catch(() => {
                console.log('result error');
            });
        }
        else {
            console.log('action error');
        }
    };

    // sending = (e, func) => {
    //     e.preventDefault();
    //     const strInput = e.target.seed.value.trim();
    //     if (strInput && strInput !== "") {
    //         const action  = func(strInput);
    //         if (action) {
    //             action.on("receipt", (receipt) => {
    //                 console.log("Successfully");
    //                 // Transaction was accepted into the blockchain, let's redraw the UI
    //                 })
    //                 .on("error", (error) => {
    //                 // Do something to alert the user their transaction has failed
    //                 console.log(error);
    //             });
    //         }
    //         else {
    //             console.log('action error');
    //         }
    //     }
    //     else {
    //         console.log('input is invalid');
    //     }
    // }
    //
    // testing = (e) => {
    //     e.preventDefault();
    //     if (e.target.seed) {
    //         const str = e.target.seed.value.trim();
    //         console.log(str);
    //     }
    //     else {
    //         console.log("error");
    //     }
    // }

    render(props) {
        return (
            <div>
                <h1>Page is {this.props.pageFromParent}</h1>
                <p>Created Ticket {this.state.numCreatedTickets}</p>
                <p>Claimed Ticket {this.state.numClaimedTickets}</p>
                <button onClick={(e) => {this.asking(e,this.getTicketsStat())}}>check created</button>

                {/*}<form onSubmit={(e) => {this.sending(e,this.createPizzaTicket)}}>
                    <input type='text' name="seed"/>
                    <button>create ticket</button>
                </form>

                <form onSubmit={(e) => {this.sending(e,this.claimTicket)}}>
                    <input type='text' name="seed"/>
                    <button>claim ticket</button>
                </form>*/}
            </div>
        );
    };
}
