import React from 'react';

class ATicketStatus extends React.Component {

    state = {
        isWaitingForResult: false
    };

    callGetATicketStatus = (e) => {
        e.preventDefault();
        if (this.state.isWaitingForResult) {
            console.log('please wait for transaction');
            return;
        }
        
        this.setState({isWaitingForResult : true}); 
        const value = e.target.seed.value;
        const func = this.props.content;
        let funcCall = undefined;

        if (func && value) {
            funcCall = func(value);
        } else {
            console.log('error! input or func is invalid');
            this.setState({isWaitingForResult : false});
            return;
        }

        funcCall.then(result => {
            console.log('result ',result);
            this.setState({isWaitingForResult : false});
        }).catch(err => {
            console.log(err);
            this.setState({isWaitingForResult : false});
        });
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