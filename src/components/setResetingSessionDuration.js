import React from 'react';

class SetResetingSessionDuration extends React.Component {
    state = {
        isWaitingForResult: false,
        duration: 60
    };

    callSetResetingSessionDuration = (e) => {
        if (this.state.isWaitingForResult) return;
        this.setState({isWaitingForResult : true}); 
        e.preventDefault();
        const value = parseInt(e.target.seed.value);
        let func = this.props.content;
        let funcCall = func(value);
        if (funcCall && Number.isInteger(value)) {
            console.log('want to set new resseting duration');
            funcCall.on('receipt', (receipt) => {
              const data = receipt.events.setNewDurationEvent.returnValues;
              console.log('sender: ', data[0], ' duration: ', data[1]);
              this.setState({
                  isWaitingForResult: false,
                  duration: data[1]
                });
            }).on('error', err => console.log(err));
        } else {
            console.log('error! input must be an integer');
            this.setState({isWaitingForResult : false});
        }
    }

    render() {
        return (
            <div className="col-md-auto">
                <form className="form-inline" onSubmit={(e) => {this.callSetResetingSessionDuration(e)}}>
                    <label>Set New Reseting Duration</label>
                    <input type='text' className="form-control" placeholder="Enter the new duration" name="seed"/>
                    <button className="btn btn-primary btn-lg">Set</button>
                </form>
            </div>
        );
    }
}

export default SetResetingSessionDuration;