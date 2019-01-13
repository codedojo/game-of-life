export default class GridView {
    constructor(width, height, rows, cols) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.cellWidth = width / cols;
        this.cellHeight = height / rows;
        this.rows = rows;
        this.cols = cols;

        this.onClick = Function.prototype;
    }

    get element() {
        throw new Error('Abstract propepty');
    }

    update(grid) {
        throw new Error('Abstract method');
    }

    reset() {
        throw new Error('Abstract method');
    }
}