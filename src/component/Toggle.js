import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: true
        };
    }

    handleClick() {
        const currentValue = !this.state.value;
        this.props.onValueChanged(currentValue);
        this.setState({
            value: currentValue
        });
    }

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.state.value ? 'Descending' : 'Ascending'}
            </button>
        );
    }
}