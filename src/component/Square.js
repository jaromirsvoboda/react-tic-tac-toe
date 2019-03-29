import React from 'react';

export default (props) => {
    const button =
        <button
            className={`square ${props.highlighted ? 'highlighted-square' : ''}`}
            onClick={props.onClick}
        >
            {props.value}
        </button>;

    return button;
}
