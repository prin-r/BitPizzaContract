import React from 'react';

class ContractActionForm extends React.Component {

    state = {};

    callContract = (e) => {
        e.preventDefault();

        const value = e.target.seed.value;
        e.target.seed.value = '';
        const func = this.props.content;
        let action = undefined;

        if (func && value) {
            try {
                action = func(value);
            } catch (err) {
                console.log(err);
                return;
            }
        } else {
            console.log('error! input or func is invalid');
            return;
        }

        this.setState((prevState) => {
            try {
                action.on("receipt", (receipt) => {
                    const data = receipt.events[Object.keys(receipt.events)[0]].returnValues;
                    console.log(data);
                    return data;
                }).on("error", (error) => {
                    console.log(error);
                });
            } catch (err) {
                try {
                    action.then(result => {
                        console.log('result ',result);
                    }).catch(err => {
                        console.log(err);
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        });
    }

    render() {
        return (
            <div className="col">
                <form className="form-inline" onSubmit={(e) => {this.callContract(e)}}>
                    <input type='text' className="form-control" placeholder={this.props.placeholder} name="seed"/>
                    <button className="btn btn-primary btn-lg" >{this.props.name}</button>
                </form>
            </div>
        );
    };
};

export default ContractActionForm;
