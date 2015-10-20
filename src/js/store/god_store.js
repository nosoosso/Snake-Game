const Reflux = require('reflux');
const GodAction = require('../actions/god_action.js');

const GodStore = Reflux.createStore({
  listenables: [GodAction],
  time: 0,
  init: function(){
  },
  onTick: function(){
    this.time = this.time + 1;
    this.trigger(this.time);
  }
});

module.exports = GodStore;
