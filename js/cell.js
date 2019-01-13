export default class Cell {
    constructor(row, col, alive = false) {
        this.row = row;
        this.col = col;
        this._alive = alive;
    }

    get isAlive() {
        return this._alive;
    }

    set isAlive(value) {
        this._alive = value;
    }

    toggleState() {
        this._alive = !this._alive;
    }

    resetState() {
        this._alive = false;
    }

    setRandomState() {
        this._alive = !!Math.round(Math.random());
    }
}