import React from 'react';

class TimeStatus extends React.Component {
    state = {
        now: 0,
        latestResetting: 0,
        duration: 60
    };

    componentDidMount = () => {
        const savingState = this.getSaving();
        if (savingState) {
            const now = parseInt(savingState.now);
            const latestResetting = parseInt(savingState.latestResetting);
            const duration = parseInt(savingState.duration);
            this.setState({
                now: (Number.isInteger(now)) ? now : 0,
                latestResetting: (Number.isInteger(latestResetting)) ? latestResetting : 0,
                duration: (Number.isInteger(duration)) ? duration : 60
            }); 
        }

        this.timer = setInterval(this.getContractStateInterval, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }

    componentDidUpdate = () => {
        localStorage.setItem("TimeStatus_state", JSON.stringify(this.state));
    }

    getSaving = () => {
        return JSON.parse(localStorage.getItem("TimeStatus_state"));
    }

    getContractStateInterval = () => {
        let func = this.props.content;
        if (func) {
            func().then(result => {
                this.setState({
                    now: result[0],
                    latestResetting: result[1],
                    duration: result[3]
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="col-md-auto">
                <p>current duration : {this.state.duration} sec </p>
            </div>
        );
    }
}

export default TimeStatus;