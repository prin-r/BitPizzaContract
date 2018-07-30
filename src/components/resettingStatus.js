import React from 'react';

class ResettingStatus extends React.Component {
    state = {
        timeRemaining: 0,
        bitOpen: false,
        pizzaOpen: false,
        status: "closed"
    };

    subtractResult = (x,y) => {
        x = parseInt(x);
        y = parseInt(y);
        if (Number.isInteger(x) && Number.isInteger(x)) {
            return (x - y > 0)? x - y : 0;
        }
        return 0;
    }

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
                    timeRemaining: this.subtractResult(result[0], result[1]),
                    bitOpen: result[2],
                    pizzaOpen: result[3],
                    status: result[4]
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
                    <div className="p-1 mb-2 text-white">time remaining: {this.state.timeRemaining} sec</div>
                </div>
                <div className="col text-center">
                    <div className="p-1 mb-2 text-white">BitStudio {(this.state.bitOpen)? "start session":"is waiting"}</div>
                </div>
                <div className="col text-center">
                    <div className="p-1 mb-2 text-white">PizzaSeller {(this.state.pizzaOpen)? "start session":"is waiting"}</div>
                </div>
                <div className="col text-center">
                    <div className="p-1 mb-2 text-white">session was {this.state.status}</div>
                </div>
            </div>
        )
    }

}

export default ResettingStatus;