import React from 'react';

class ATicketStatus extends React.Component {

    state = {
        isWaitingForResult: false
    };

    callGetATicketStatus = (e) => {
        if (this.state.isWaitingForResult) return;
        this.setState({isWaitingForResult : true});
        e.preventDefault();
        console.log('check ticket status');
        const value = e.target.seed.value;
        let func = this.props.content;
        let funcCall = func(value);
        if (funcCall && value) {
            funcCall.then(result => {
                console.log('result ',result);
                this.setState({isWaitingForResult : false});
            }).catch(err => {
                console.log(err);
                this.setState({isWaitingForResult : false});
            });
        }
    }
    
    render() {
        return (
            <div className="col-md-auto">
                <form className="form-inline" onSubmit={(e) => {this.callGetATicketStatus(e)}}>
                    <label>Check Ticket Status</label>
                    <input type='text' className="form-control" placeholder="Enter Key" name="seed"/>
                    <button className="btn btn-primary btn-lg">Check Status</button>
                </form>
            </div>
        );
    };
}

export default ATicketStatus;