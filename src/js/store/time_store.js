const Reflux = require('reflux');

const Action = require('../actions/action.js');

const TimeStore = Reflux.createStore({
    listenables: [Action],
    time: 0,
    onTick: function () {
        this.time = this.time + 1;
        this.trigger(this.time);
    }
});

module.exports = TimeStore;
