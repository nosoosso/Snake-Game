const React = require('react');
const Reflux = require('reflux');

const GameStore = require('../store/game_store.js');
const Action = require('../actions/action.js');

const Board = require('./board.js');

const SnakeGame = React.createClass({
    mixins: [Reflux.connect(GameStore, 'gameStore')],
    componentDidMount: function () {
        Action.pageLoad();
    },
    render: function () {
        if (!this.state.gameStore) {
            return (<div></div>);
        }
        return (
            <div>
                <div><a href="https://github.com/nosoosso/Snake-Game">code</a></div>
                <Score score={this.state.gameStore.score}/>
                <Board board={this.state.gameStore.board} item={this.state.gameStore.item}/>
                <TitleMessage scene={this.state.gameStore.scene}/>
            </div>
        );
    }
});

const Score = React.createClass({
    PropTypes: {
        score: React.PropTypes.number.isRequired
    },
    render: function () {
        return (
            <header className="info">
                <div>SCORE:{this.props.score}</div>
            </header>
        );
    }
});

const TitleMessage = React.createClass({
    PropTypes: {
        scene: React.PropTypes.string.isRequired
    },
    render: function () {
        if (this.props.scene === 'title' || this.props.scene === 'dead') {
            return (<div id="title-message">PRESS SPACE KEY</div>);
        } else {
            return (<div></div>);
        }
    }
});

module.exports = SnakeGame;
