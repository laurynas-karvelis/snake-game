const Keyboard = require('./keyboard');
const Render = require('./render');
const Snake = require('./snake');

const worldFactory = (width, height) => {
    const keyboard = Keyboard();
    const render = Render(width, height);
    const snake = Snake({width, height}, [[Math.floor(width / 2), Math.floor(height / 2)]]);

    const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const randomizeFood = () => [random(2, width - 2), random(2, height - 2)];

    let food;

    const draw = () => {
        snake.defineFood(food);

        render.world(snake);
        render.food(food[0], food[1]);
        render.snake(snake);

        snake.dead() && render.gameOver();
    };

    const start = () => {
        render.hideCursor();
        food = randomizeFood();

        snake.emitter.on('ate', () => {
            food = randomizeFood();
            snake.defineFood(food);
        });

        keyboard.on('move', (dir) => {
            snake.alive() && snake.move(dir);
            draw();
        });

        draw();
    };

    return {start};
};

module.exports = worldFactory;
