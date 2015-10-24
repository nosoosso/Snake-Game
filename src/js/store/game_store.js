const Reflux = require('reflux');
const {List, Map} = require('immutable');

const TimeStore = require('./time_store.js');
const Action = require('../actions/action.js');

const co = require('../constants.js');

const GameStore = Reflux.createStore({
    listenables: [Action],
    data: {
        scene: 'title',
        board: null,
        item: null,
        snake: {
            head: null,
            length: 1,
            direction: 'right',
            prevDirection: 'right'
        },
        score: 0
    },
    onPageLoad: function () {
        this.trigger(this.data);
    },
    onKeyPress: function (key) {
        if (this.data.scene === 'title' || this.data.scene === 'dead') {
            // space key
            if (key === 32) {
                this.initializeGame();
                this.data.scene = 'playing';
            }
            return;
        }

        let direction = '';
        if (key === 37) {
            direction = 'left';
        } else if (key === 38) {
            direction = 'up';
        } else if (key === 39) {
            direction = 'right';
        } else if (key === 40) {
            direction = 'down';
        } else {
            return;
        }
        let prevDirection = this.data.snake.prevDirection;
        // can't move against previous direction
        if (prevDirection === 'right' && direction === 'left' ||
            prevDirection === 'left' && direction === 'right' ||
            prevDirection === 'up' && direction === 'down' ||
            prevDirection === 'down' && direction === 'up'
        ) {
            return;
        }

        this.data.snake.direction = direction;
    },
    init: function () {
        this.initializeBoard();
        this.data.item = Map({
            x: -1,
            y: -1
        });
        this.data.snake.head = Map({
            x: -1,
            y: -1
        });
        this.listenTo(TimeStore, this.update);
    },
    initializeBoard: function () {
        // fill board with 0
        this.data.board = List.of();
        let row = List.of();
        for (let i = 0; i < co.boardSize.x; i++) {
            row = row.push(0);
        }
        for (let i = 0; i < co.boardSize.y; i++) {
            this.data.board = this.data.board.push(row);
        }
    },
    initializeGame: function () {
        this.initializeBoard();

        let initialPosX = Math.floor(co.boardSize.x / 6);
        let initialPosY = Math.floor(co.boardSize.y / 2);
        this.data.board = this.data.board.setIn([initialPosY, initialPosX], 1);
        this.data.snake.head = Map({x: initialPosX, y: initialPosY});

        this.data.snake.length = 1;
        this.data.snake.direction = 'right';
        this.data.snake.prevDirection = 'right';

        this.putNewItem();

        this.data.score = 0;
    },
    putNewItem: function () {
        let emptyCells = List.of();
        for (let y = 0; y < co.boardSize.y; y++) {
            for (let x = 0; x < co.boardSize.x; x++) {
                if (this.data.board.get(y).get(x) === 0) {
                    emptyCells = emptyCells.push(Map({x: x, y: y}));
                }
            }
        }
        let newItemPos = emptyCells.get(Math.floor(Math.random() * (emptyCells.count() - 1)));

        this.data.item = Map({
            x: newItemPos.get('x'),
            y: newItemPos.get('y')
        });
    },
    update: function () {
        if (this.data.scene === 'title' || this.data.scene === 'dead') {
            return;
        }

        let currentHead = this.data.snake.head;
        // move head
        switch (this.data.snake.direction) {
            case 'right':
                this.data.snake.head = currentHead.set('x', currentHead.get('x') + 1);
                break;
            case 'left':
                this.data.snake.head = currentHead.set('x', currentHead.get('x') - 1);
                break;
            case 'up':
                this.data.snake.head = currentHead.set('y', currentHead.get('y') - 1);
                break;
            case 'down':
                this.data.snake.head = currentHead.set('y', currentHead.get('y') + 1);
                break;
        }

        let snakeHead = this.data.snake.head;
        if (snakeHead.get('x') < 0 ||
            snakeHead.get('y') < 0 ||
            snakeHead.get('x') >= co.boardSize.x ||
            snakeHead.get('y') >= co.boardSize.y ||
            this.data.board.get(snakeHead.get('y')).get(snakeHead.get('x')) > 1
        ) {
            this.data.scene = 'dead';
            this.trigger(this.data);
            return;
        }

        this.data.board = this.data.board.setIn([snakeHead.get('y'), snakeHead.get('x')], this.data.snake.length + 1);

        let item = this.data.item;
        // get item
        if (snakeHead.get('x') === item.get('x') && snakeHead.get('y') === item.get('y')) {
            this.data.snake.length += 1;
            this.putNewItem();
            this.data.score += co.itemPoint;
        } else {
            this.data.board = this.data.board.map(row =>
                    row.map(cell => {
                        if (cell > 0) return cell - 1;
                        else return cell;
                    })
            );
        }

        this.data.snake.prevDirection = this.data.snake.direction;
        this.trigger(this.data);
    }
});

module.exports = GameStore;
