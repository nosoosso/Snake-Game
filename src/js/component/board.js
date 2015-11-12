const React = require('react');
const Reflux = require('reflux');
const {List} = require('immutable');

const GameStore = require('../store/game_store.js');

const Board = React.createClass({
    propTypes: {
        board: React.PropTypes.object.isRequired,
        item: React.PropTypes.object.isRequired
    },
    getRows: function () {
        let rows = List.of();
        for (let y = 0; y < this.props.board.count(); y++) {
            rows = rows.push(<Row board={this.props.board} item={this.props.item} key={y} y={y}/>);
        }
        return rows;
    },
    render: function () {
        let rows = this.getRows();
        return (
            <table>
                {rows}
            </table>
        );
    }
});

const Row = React.createClass({
    propTypes: {
        board: React.PropTypes.object.isRequired,
        item: React.PropTypes.object.isRequired,
        y: React.PropTypes.number.isRequired
    },
    getCells: function () {
        let cells = List.of();
        for (let x = 0; x < this.props.board.get(0).count(); x++) {
            let snake = false;
            let item = false;

            if (this.props.board.get(this.props.y).get(x) > 0) {
                snake = true;
            } else if (x === this.props.item.get('x') && this.props.y === this.props.item.get('y')) {
                item = true;
            }

            cells = cells.push(<Cell key={x} snake={snake} item={item}/>);
        }
        return cells;
    },
    render: function () {
        let cells = this.getCells();
        return (
            <tr>
                {cells}
            </tr>
        );
    }
});

const Cell = React.createClass({
    propTypes: {
        snake: React.PropTypes.bool.isRequired,
        item: React.PropTypes.bool.isRequired
    },
    render: function () {
        if (this.props.snake === true) {
            return (
                <td className="snake"></td>
            );
        } else if (this.props.item === true) {
            return (
                <td className="item"></td>
            );
        }
        return (
            <td className="cell"></td>
        );
    }
});

module.exports = Board;