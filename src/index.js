const [width, height] = process.stdout.getWindowSize();
const World = require('./world');

World(width, height).start();
