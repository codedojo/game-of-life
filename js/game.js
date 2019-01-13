import Grid from './grid.js';

export default class Game {
    constructor(gridRows, gridCols) {
        this._grid = new Grid(gridRows, gridCols);
        this.isPlaying = false;
        this.baseSpeed = 1000;
        this.speed = 0;
        this.interval = null;

        this.onCellStateChange = Function.prototype;
        this.onGridStateChange = Function.prototype;

        this.next = this.next.bind(this);
    }

    toggleCellState(row, col) {
        const cell = this._grid.toggleCellState(row, col);

        this.onGridStateChange(cell);
    }

    next() {
        const nextGrid = this._grid.next();

        this.onGridStateChange(nextGrid);
    }

    play() {
        this.isPlaying = true;
        this._startInterval();
    }

    pause() {
        this.isPlaying = false;
        this._stopInterval();
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    reset() {
        this.pause();

        const resetGrid = this._grid.reset();

        this.onGridStateChange(resetGrid);
    }

    randomize() {
        if (this.isPlaying) return;

        const randomGrid = this._grid.randomize();

        this.onGridStateChange(randomGrid);
    }

    changeSpeed(value) {
        this.speed = value;
        this._stopInterval();
        this._startInterval();
    }

    _startInterval() {
        this.interval = setInterval(this.next, this.baseSpeed - this.speed);
    }

    _stopInterval() {
        clearInterval(this.interval);
    }
}