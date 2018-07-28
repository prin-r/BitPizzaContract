import React from 'react';

export default class TicketForm extends React.Component {

    state = {
        str: ''
    };

    handleChange(e) {
        e.preventDefault();
        console.log(e.target.value);
        // if (e.target) {
        //     this.setState({str: e.target.value});
        // }
        // else {
        //     console.log(e.target);
        // }
    };
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.state.value);
    };

    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} name="str" onChange={(e) => {this.handleChange(e)}} />
            </label>
            <input type="submit" value="Submit" />
         </form>
        );
    };  
}