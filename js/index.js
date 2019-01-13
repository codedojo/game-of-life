import Game from './game.js';
import View from './view.js';
import TableGridView from './table-grid-view.js';
import CanvasGridView from './canvas-grid-view.js';
import Controller from './controller.js';

const GRID_WIDTH = 1280;
const GRID_HEIGHT = 720;
const GRID_ROWS = 36;
const GRID_COLS = 64;

const root = document.getElementById('root');

const game = new Game(GRID_ROWS, GRID_COLS);
const tableGridView = new TableGridView(GRID_WIDTH, GRID_HEIGHT, GRID_ROWS, GRID_COLS);
const canvasGridView = new CanvasGridView(GRID_WIDTH, GRID_HEIGHT, GRID_ROWS, GRID_COLS);
const view = new View(tableGridView, root);
const controller = new Controller(game, view);