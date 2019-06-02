const EventEmitter = require('events');

const snakeFactory = ({width, height}, position, size = 20) => {
    const emitter = new EventEmitter;

    let isAlive = true;
    let food = null;

    const getPosition = () => position;
    const head = () => position[0];
    const alive = () => isAlive;
    const dead = () => !isAlive;
    const die = () => {
        isAlive = false;
        emitter.emit('died');
    };

    const defineFood = (_food) => food = _food;

    const crossedItself = () => {
        const coors = position.map(([x, y]) => y * width + x);
        return new Set(coors).size !== position.length;
    };

    const shouldEat = () => {
        const [x, y] = head();
        const headCoor = y * width + x;
        const foodCoor = food && food.length && food[1] * width + food[0];

        if (headCoor === foodCoor) eat();
    };

    const eat = () => {
        size += 4;
        emitter.emit('ate');
    };

    const direction = {
        left: (head) => head[0]--,
        right: (head) => head[0]++,
        up: (head) => head[1]--,
        down: (head) => head[1]++
    };

    const hit = {
        left: (head) => head[0] <= 2,
        right: (head) => head[0] > width - 2,
        up: (head) => head[1] <= 2,
        down: (head) => head[1] > height - 2,
    };

    const move = (dir) => {
        const currentHead = head().slice();

        if (hit[dir](currentHead)) {
            // oh well
            return die();
        }

        direction[dir](currentHead);

        position.unshift(currentHead);
        position.length > size && position.pop();

        crossedItself() && die();
        alive() && shouldEat();
    };

    return {getPosition, alive, dead, defineFood, move, emitter};
};

module.exports = snakeFactory;
