class Grid {
    constructor(gridWidth, gridHeight, gridRows, gridCols) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.gridRows = gridRows;
        this.gridCols = gridCols;
        this.cellWidth = gridWidth / gridCols;
        this.cellHeight = gridHeight / gridRows;
        this.element = null;

        this._grid = [];
        this._nextGrid = [];

        this._init();
    }

    next() {
        this._forEachCell(cell => {
            const numberOfNeighbors = this._countNeighbors(cell);

            if (cell.alive) {
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
            cell.alive = this._nextGrid[cell.row][cell.col];
            this._nextGrid[cell.row][cell.col] = false;
        });
    }

    reset() {
        this._forEachCell(cell => cell.alive = false);
    }

    randomize() {
        this._forEachCell(cell => cell.alive = !!Math.round(Math.random()));
    }

    _init() {
        const table = document.createElement('table');

        table.className = 'grid';

        for (let i = 0; i < this.gridRows; i++) {
            const tr = document.createElement('tr');

            tr.className = 'row';

            this._grid[i] = [];
            this._nextGrid[i] = [];

            for (let j = 0; j < this.gridCols; j++) {
                const cell = new Cell(this.cellWidth, this.cellHeight, i, j);

                this._grid[i][j] = cell;
                this._nextGrid[i][j] = false;

                tr.appendChild(cell.element);
            }

            table.appendChild(tr);
        }

        this.element = table;
    }

    _countNeighbors({ row, col }) {
        let count = 0;

        if (row - 1 >= 0) { // top
            if (this._grid[row - 1][col].alive) count += 1;
        }

        if (row - 1 >= 0 && col - 1 >= 0) { // top left
            if (this._grid[row - 1][col - 1].alive) count += 1;
        }

        if (row - 1 >= 0 && col + 1 < this.gridCols) { // top right
            if (this._grid[row - 1][col + 1].alive) count += 1;
        }

        if (col - 1 >= 0) { // left
            if (this._grid[row][col - 1].alive) count += 1;
        }

        if (col + 1 < this.gridCols) { // right
            if (this._grid[row][col + 1].alive) count += 1;
        }

        if (row + 1 < this.gridRows) { // bottom
            if (this._grid[row + 1][col].alive) count += 1;
        }

        if (row + 1 < this.gridRows && col - 1 >= 0) { // bottom left
            if (this._grid[row + 1][col - 1].alive) count += 1;
        }

        if (row + 1 < this.gridRows && col + 1 < this.gridCols) { // bottom right
            if (this._grid[row + 1][col + 1].alive) count += 1;
        }

        return count;
    }

    _isNeighborAlive(row, col) {
        if (!this._grid[row] || !this._grid[col]) return false;

        return this._grid[row][col].alive;
    }

    _forEachCell(fn) {
        for (let i = 0; i < this.gridRows; i++) {
            for (let j = 0; j < this.gridCols; j++) {
                fn(this._grid[i][j]);
            }
        }
    }
}