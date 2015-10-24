const Reflux = require('reflux');

const actions = Reflux.createActions([
    'tick',
    'pageLoad',
    'keyPress'
]);

module.exports = actions;
