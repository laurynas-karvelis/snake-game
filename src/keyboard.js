const keypress = require('keypress');
const EventEmitter = require('events');
const whitelist = ['left', 'up', 'right', 'down'];

const keyboardFactory = (stream = process.stdin) => {
    const emitter = new EventEmitter;

    // make `process.stdin` begin emitting "keypress" events
    keypress(stream);

    stream.on('keypress', (ch, key) => {
        key && whitelist.includes(key.name) && emitter.emit('move', key.name);
        key && key.ctrl && key.name === 'c' && process.exit();
    });

    stream.setRawMode(true);
    stream.resume();

    return emitter;
};

keyboardFactory();

module.exports = keyboardFactory;
