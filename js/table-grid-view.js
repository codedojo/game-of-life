import { createElement } from './lib/dom.js';
import GridView from './grid-view.js';

export default class TableGridView extends GridView {
    constructor(width, height, rows, cols) {
        super(width, height, rows, cols);

        this._table = null;

        this._init();
    }

    get element() {
        return this._table;
    }

    update(grid) {
        this._forEachCell((tableCell, rowIndex, cellIndex) => {
            this._updateCell(tableCell, grid[rowIndex][cellIndex]);
        });
    }

    reset() {
        this._forEachCell(tableCell => {
            this._resetCell(tableCell);
        });
    }

    _init() {
        this._createTable();
        this._handleEvents();
    }

    _createTable() {
        const table = createElement('table', { className: 'grid' });

        for (let i = 0; i < this.rows; i++) {
            const row = createElement('tr', { className: 'row' });

            for (let j = 0; j < this.cols; j++) {
                const cell = createElement('td', {
                    className: 'cell',
                    width: this.cellWidth,
                    height: this.cellHeight
                });

                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        this._table = table;
    }

    _handleEvents() {
        this._table.addEventListener('click', event => {
            if (!event.target.classList.contains('cell')) return;

            const rowIndex = event.target.parentNode.rowIndex;
            const cellIndex = event.target.cellIndex;
            
            this.onClick(rowIndex, cellIndex);
        });
    }

    _updateCell(tableCell, cell) {
        tableCell.classList.toggle('alive', cell.isAlive);
    }

    _resetCell(tableCell) {
        tableCell.classList.remove('alive');
    }
    
    _forEachCell(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                fn(this._table.rows[i].cells[j], i, j);
            }
        }
    }
}