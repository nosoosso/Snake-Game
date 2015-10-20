const React = require('react');
const Reflux = require('reflux');
const GodStore = require('../store/god_store.js');

const SnakeGame = React.createClass({
  mixins: [Reflux.connect(GodStore, 'godStore')],
  render: function(){
    if(!this.state.godStore) return(<div>aaa</div>);
    return (
      <div>{this.state.godStore}</div>
    );
  }
});

module.exports = SnakeGame;
