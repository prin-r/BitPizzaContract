import React from 'react';

class SetResetingSessionDuration extends React.Component {
    state = {
        isWaitingForResult: false,
        duration: 60
    };

    componentWillMount = () => {
        this.timer = setInterval(this.getContractStateInterval, 5000);
    }

    componentDidMount = () => {
        const savingState = this.getSaving();
        const dur = parseInt(savingState.duration);    
        savingState.isWaitingForResult = false;
        savingState.duration = (Number.isInteger(dur)) ? dur : 60;    
        this.setState(savingState);
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    componentDidUpdate = () => {
        localStorage.setItem("SetResetingSessionDuration_state", JSON.stringify(this.state));
    }

    getSaving = () => {
        return JSON.parse(localStorage.getItem("SetResetingSessionDuration_state"));
    }

    getContractStateInterval = () => {
        let func = this.props.content.getTimeFunc;
        if (func) {
            func().then(result => {
                this.setState({
                    duration: result[3]
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    callSetResetingSessionDuration = (e) => {
        e.preventDefault();

        if (this.state.isWaitingForResult) {
            console.log('please wait for transaction');
            return;
        }

        this.setState({isWaitingForResult : true}); 
        const value = parseInt(e.target.seed.value);
        const func = this.props.content.resetFunc;
        let funcCall = undefined;

        if (func && Number.isInteger(value)) {
            funcCall = func(value);
        } else {
            console.log('error! input or func is invalid');
            this.setState({isWaitingForResult : false});
            return;
        }

        console.log('request for new duration');
        funcCall.on('receipt', (receipt) => {
            const data = receipt.events.setNewDurationEvent.returnValues;
            console.log('sender: ', data[0], ' duration: ', data[1]);
            this.setState({
                isWaitingForResult: false,
                duration: data[1]
            });
        }).on('error', err => {
            console.log(err);
            this.setState({isWaitingForResult : false});
        });
    }

    render() {
        return (
            <div className="col-md-auto">
                <form className="form-inline" onSubmit={(e) => {this.callSetResetingSessionDuration(e)}}>
                    <label>current duration : {this.state.duration} sec </label>
                    <input type='text' className="form-control" placeholder="Enter the new duration" name="seed"/>
                    <button className="btn btn-primary btn-lg">Set</button>
                </form>
            </div>
        );
    }
}

export default SetResetingSessionDuration;