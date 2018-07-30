import React from 'react';

class TicketsStatus extends React.Component {
    state = {
        currentPackageIndex: 0,
        numCreatedTickets: 0,
        numClaimedTickets: 0,
    };

    componentWillMount = () => {
        this.timer = setInterval(this.getContractStateInterval, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    getContractStateInterval = () => {
        let func = this.props.content();
        if (func) {
            func.then(result => {
                this.setState({
                    currentPackageIndex: result[0],
                    numCreatedTickets: result[1],
                    numClaimedTickets: result[2]
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col text-center">
                    <div className="p-1 mb-2 text-white">Created Ticket: {this.state.numCreatedTickets}</div>
                </div>
                <div className="col text-center">
                    <div className="p-1 mb-2 text-white">Claimed Ticket: {this.state.numClaimedTickets}</div>
                </div>
            </div>
        )
    }
}

export default TicketsStatus;