import React from 'react';

class ContractActionButton extends React.Component {

    state = {};

    callContract = () => {
        const func = this.props.content;
        let action = undefined;

        if (func) {
            action = func();
            action.on("receipt", (receipt) => {
                const data = receipt.events[Object.keys(receipt.events)[0]].returnValues;
                console.log(data);
            }).on("error", (error) => {
                console.log(error);
            });
        } else {
            console.log('error! input or func is invalid');
        }
    }

    render() {
        return (
          <div className="col">
            <button className="btn btn-primary btn-lg" onClick={this.callContract}>{this.props.message}</button>
          </div>
        );
    };
};

export default ContractActionButton;
