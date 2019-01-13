import Cell from './cell.js';

export default class Grid {
    constructor(gridRows, gridCols) {
        this.gridRows = gridRows;
        this.gridCols = gridCols;
        this._grid = [];
        this._nextGrid = [];

        this._init();
    }

    toggleCellState(row, col) {
        const cell = this._grid[row][col];

        cell.toggleState();

        return this._grid;
    }

    next() {
        this._forEachCell(cell => {
            const numberOfNeighbors = this._countNeighbors(cell);

            if (cell.isAlive) {
                if (numberOfNeighbors < 2) {
                    this._nextGrid[cell.row][cell.col] = false;
                } else if (numberOfNeighbors === 2 || numberOfNeighbors === 3) {
                    this._nextGrid[cell.row][cell.col] = true;
                } else if (numberOfNeighbors > 3) {
                    this._nextGrid[cell.row][cell.col] = false;
                }
            } else {
                if (numberOfNeighbors === 3) {
                    this._nextGrid[cell.row][cell.col] = true;
                }
            }
        });

        this._forEachCell(cell => {
            cell.isAlive = this._nextGrid[cell.row][cell.col];
            this._nextGrid[cell.row][cell.col] = false;
        });

        return this._grid;
    }

    reset() {
        this._forEachCell(cell => cell.resetState());

        return this._grid;
    }

    randomize() {
        this._forEachCell(cell => cell.setRandomState());

        return this._grid;
    }

    _init() {
        for (let i = 0; i < this.gridRows; i++) {
            this._grid[i] = [];
            this._nextGrid[i] = [];

            for (let j = 0; j < this.gridCols; j++) {
                const cell = new Cell(i, j);

                this._grid[i][j] = cell;
                this._nextGrid[i][j] = false;
            }
        }
    }

    _countNeighbors({ row, col }) {
        let count = 0;

        if (this._isCellAlive(row - 1, col - 1)) count++; // top left
        if (this._isCellAlive(row - 1, col)) count++; // top
        if (this._isCellAlive(row - 1, col + 1)) count++; // top right
        if (this._isCellAlive(row, col + 1)) count++; // right
        if (this._isCellAlive(row + 1, col + 1)) count++; // bottom right
        if (this._isCellAlive(row + 1, col)) count++; // bottom
        if (this._isCellAlive(row + 1, col - 1)) count++; // bottom left
        if (this._isCellAlive(row, col - 1)) count++; // left

        return count;
    }

    _isCellAlive(row, col) {
        if (!this._grid[row] || !this._grid[row][col]) return false;

        return this._grid[row][col].isAlive;
    }

    _forEachCell(fn) {
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                fn(this._grid[i][j]);
            }
        }
    }
}