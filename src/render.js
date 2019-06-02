const Canvas = require('term-canvas');
const COLOR = {BLUE: 'blue', WHITE: 'white', RED: 'red', GREEN: 'green'};

const renderFactory = (width, height) => {
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');
    const hideCursor = () => ctx.hideCursor();

    const world = (snake) => {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = snake.alive() ? COLOR.BLUE : COLOR.RED;
        ctx.strokeRect(1, 1, width, height);
    };

    const point = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    };

    const food = (x, y) => point(x, y, COLOR.GREEN);

    const snake = (o) => o.getPosition().forEach(([x, y], i) => {
        point(x, y, o.alive() ? i && COLOR.WHITE || COLOR.BLUE : COLOR.RED);
    });

    const gameOver = () => {
        const msg = 'GAME OVER';

        ctx.fillStyle = 'black';
        ctx.fillText(msg, Math.floor((width - msg.length) / 2), Math.floor(height / 2));
    };

    return {hideCursor, world, food, snake, point, gameOver};
};

module.exports = renderFactory;
