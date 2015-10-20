const React = require('react');
const SnakeGame = require('./component/snake_game.jsx');
const GodAction = require('./actions/god_action.js');

window.App = {
  render: function(){
    setInterval(function(){
      GodAction.tick();
    }, 500);
    React.render(
      <SnakeGame />,
      document.getElementById('snake-game')
    );
  }
};
