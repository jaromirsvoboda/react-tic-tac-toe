import React from 'react';
import Board from './Board';
import Toggle from './Toggle';

const DIMENSION = 3;

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this._descendingMoves = true;
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastTurn: {
                    isX: null,
                    column: null,
                    row: null,
                }
            }],
            stepNumber: 0,
            xIsNext: true,
            selectedStep: null,
            movesSortedDesc: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares).symbol || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
                lastTurn: {
                    isX: this.state.xIsNext,
                    column: Math.floor(i / DIMENSION),
                    row: i % DIMENSION,
                }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            selectedStep: null,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            selectedStep: step,
        })
    }

    onToggleValueChanged(value) {
        this.setState({
            movesSortedDesc: value
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const winningSymbol = winner.symbol;
        const winningLine = winner.line;

        let status;
        if (winningSymbol) {
            status = 'Winner: ' + winningSymbol;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            let shouldBeHighlighted = false;
            if (this.state.selectedStep !== null && this.state.selectedStep === move) {
                shouldBeHighlighted = true;
            }
            let desc;
            if (move > 0) {
                const symbol = step.lastTurn.isX ? 'X' : 'O';
                desc = `Go to move ${move} by player ${symbol} at (${step.lastTurn.column}, ${step.lastTurn.row})`;
            } else {
                desc = 'Go to game start';
            }
            return (
                <li key={move}>
                    <button
                        className={shouldBeHighlighted ? 'highlighted-text' : ''}
                        onClick={() => this.jumpTo(move)}
                    >{desc}</button>
                </li>
            );
        });
        if (!this.state.movesSortedDesc) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winningLine={winningLine}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <Toggle
                            onValueChanged={(value) => this.onToggleValueChanged(value)}
                        />
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                symbol: squares[a],
                line: lines[i],
            };
        }
    }
    return {
        symbol: null,
        line: [],
    };
}