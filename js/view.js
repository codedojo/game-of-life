import { createElement } from './lib/dom.js';

export default class View {
    constructor(gridView, rootElement) {
        this.gridView = gridView;
        this.rootElement = rootElement;
        this._controls = {};
        this._controlsElement = null;

        this.onGridClick = Function.prototype;
        this.onStartButtonClick = Function.prototype;
        this.onResetButtonClick = Function.prototype;
        this.onRandomizeButtonClick = Function.prototype;
        this.onSpeedSliderChange = Function.prototype;
    }

    init() {
        this.gridView.onClick = this.onGridClick;
        this._createControls();
        this._render();
    }

    updateGrid(grid) {
        this.gridView.update(grid);
    }

    updateControls(isPlaying) {
        if (isPlaying) {
            this._controls.startButton.textContent = 'pause';
            this._controls.startButton.title = 'Остановить игру';
            this._controls.randomizeButton.disabled = true;
            this._controls.speedSlider.disabled = false;
        } else {
            this._controls.startButton.textContent = 'play_arrow';
            this._controls.startButton.title = 'Запустить игру';
            this._controls.randomizeButton.disabled = false;
            this._controls.speedSlider.disabled = true;
        }
    }

    resetControls() {
        this._controls.startButton.textContent = 'play_arrow';
        this._controls.startButton.title = 'Запустить игру';
        this._controls.speedSlider.value = 0;
        this._controls.randomizeButton.disabled = false;
    }

    _createControls() {
        const startButton = createElement('button', {
            className: 'material-icons',
            onclick: () => this.onStartButtonClick()
        }, 'play_arrow');

        const resetButton = createElement('button', {
            className: 'material-icons',
            onclick: () => this.onResetButtonClick()
        }, 'replay');

        const randomizeButton = createElement('button', {
            className: 'material-icons',
            onclick: () => this.onRandomizeButtonClick()
        }, 'transform');

        const speedSlider = createElement('input', {
            type: 'range',
            min: 0,
            max: 900,
            step: 100,
            value: 0,
            disabled: true,
            oninput: event => this.onSpeedSliderChange(Number(event.target.value))
        });

        this._controls = { startButton, resetButton, randomizeButton, speedSlider };

        this._controlsElement = createElement('div', {
            className: 'controls'
        }, startButton, resetButton, randomizeButton, speedSlider);
    }

    _render() {
        this.rootElement.appendChild(this.gridView.element);
        this.rootElement.appendChild(this._controlsElement);
    }
}