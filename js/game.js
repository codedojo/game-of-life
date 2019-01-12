const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;
const GAME_SPEED = 1000;

const grid = createGrid(GRID_ROWS, GRID_COLS);
const nextGrid = createGrid(GRID_ROWS, GRID_COLS);

let isPlaying = false;
let interval = null;

const root = document.getElementById('root');

const table = createTable(GRID_ROWS, GRID_COLS);
createControls();

function play() {
    computeNextGrid();
    updateView();
}

function updateView() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const cell = table.rows[i].cells[j];
            const isCellAlive = grid[i][j];

            cell.classList.toggle('alive', isCellAlive);
        }
    }
}

function createTable(rows, cols) {
    const table = document.createElement('table');

    table.className = 'grid';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');

        row.className = 'row';

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');

            cell.className = 'cell';
            cell.width = GRID_WIDTH / cols;
            cell.height = GRID_HEIGHT / rows;

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    table.addEventListener('click', event => {
        if (!event.target.classList.contains('cell')) return;

        const cell = event.target;
        const rowIndex = cell.parentNode.rowIndex;
        const cellIndex = cell.cellIndex;
        const isCellAlive = grid[rowIndex][cellIndex] === 1 ? true : false;

        grid[rowIndex][cellIndex] = isCellAlive ? 0 : 1;

        cell.classList.toggle('alive', !isCellAlive);
    });

    root.appendChild(table);

    return table;
}

function createControls() {
    const startButton = document.createElement('button');
    startButton.className = 'material-icons';
    startButton.textContent = 'play_arrow';
    startButton.addEventListener('click', function() {
        if (isPlaying) {
            isPlaying = false;
            this.textContent = 'play_arrow';
            clearInterval(interval);
        } else {
            isPlaying = true;
            this.textContent = 'pause';
            interval = setInterval(play, GAME_SPEED);
            play();
        }
    });

    const resetButton = document.createElement('button');
    resetButton.className = 'material-icons';
    resetButton.textContent = 'replay';
    resetButton.addEventListener('click', function() {
        isPlaying = false;
        startButton.textContent = 'play_arrow';

        clearInterval(interval);
        resetGrid();
        updateView();
    });

    const randomizeButton = document.createElement('button');
    randomizeButton.className = 'material-icons';
    randomizeButton.textContent = 'transform';
    randomizeButton.addEventListener('click', function() {
        isPlaying = false;
        startButton.textContent = 'play_arrow';

        clearInterval(interval);
        randomizeGrid();
        updateView();
    });

    const speedSlider = document.createElement('input');
    speedSlider.type = 'range';
    speedSlider.min = 0;
    speedSlider.max = 900;
    speedSlider.step = 100;
    speedSlider.addEventListener('input', function() {
        clearInterval(interval);
        interval = setInterval(play, GAME_SPEED - this.value);
    });

    const container = document.createElement('div');
    container.className = 'controls';

    container.append(startButton, resetButton, randomizeButton, speedSlider);

    root.appendChild(container);
}

function createGrid(rows, cols) {
    const grid = [];

    for (let i = 0; i < rows; i++) {
        grid[i] = [];

        for (let j = 0; j < cols; j++) {
            grid[i][j] = 0;
        }
    }

    return grid;
}

function randomizeGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = Math.round(Math.random());
        }
    }
}

function resetGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
}

function computeNextGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            applyRules(i, j);
        }
    }

    copyNextGrid();
}

function copyNextGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function applyRules(row, col) {
    const isCellAlive = grid[row][col];
    const numberOfNeighbors = countNeighbors(row, col);

    if (isCellAlive) {
        if (numberOfNeighbors < 2) {
            // cell dies
            nextGrid[row][col] = 0;
        } else if (numberOfNeighbors === 2 || numberOfNeighbors === 3) {
            // cell lives
            nextGrid[row][col] = 1;
        } else if (numberOfNeighbors > 3) {
            // cell dies
            nextGrid[row][col] = 0;
        }
    } else {
        if (numberOfNeighbors === 3) {
            // cell lives
            nextGrid[row][col] = 1;
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;

    if (row - 1 >= 0) { // top
        if (grid[row - 1][col] === 1) count++;
    }

    if (row - 1 >= 0 && col - 1 >= 0) { // top left
        if (grid[row - 1][col - 1] == 1) count++;
    }

    if (row - 1 >= 0 && col + 1 < GRID_COLS) { // top right
        if (grid[row - 1][col + 1] == 1) count++;
    }

    if (col - 1 >= 0) { // left
        if (grid[row][col - 1] == 1) count++;
    }

    if (col + 1 < GRID_COLS) { // right
        if (grid[row][col + 1] == 1) count++;
    }

    if (row + 1 < GRID_ROWS) { // bottom
        if (grid[row + 1][col] == 1) count++;
    }

    if (row + 1 < GRID_ROWS && col - 1 >= 0) { // bottom left
        if (grid[row + 1][col - 1] == 1) count++;
    }

    if (row + 1 < GRID_ROWS && col + 1 < GRID_COLS) { // bottom right
        if (grid[row + 1][col + 1] == 1) count++;
    }

    return count;
}