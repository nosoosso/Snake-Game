const React = require('react');

const SnakeGame = require('./component/snake_game.js');
const Action = require('./actions/action.js');

window.App = {
    render: function () {
        setInterval(function () {
            Action.tick();
        }, 90);
        React.render(
            <SnakeGame />,
            document.getElementById('snake-game')
        );
    }
};
window.onkeydown = function (e) {
    Action.keyPress(e.keyCode);
};