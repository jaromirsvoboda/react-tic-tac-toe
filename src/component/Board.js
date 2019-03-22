import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        const rows = [];
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            let squares = [];
            for (let squareIndex = rowIndex * 3; squareIndex < (rowIndex + 1) * 3; squareIndex++) {
                squares.push(this.renderSquare(squareIndex));
            }
            rows.push(<div className="board-row">{squares}</div>);
        }

        return <div>{rows}</div>;
    }
}