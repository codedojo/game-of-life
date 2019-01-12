class Game {
    constructor(gridWidth, gridHeight, gridRows, gridCols, root) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.gridRows = gridRows;
        this.gridCols = gridCols;
        this.root = root;

        this.grid = new Grid(gridWidth, gridHeight, gridRows, gridCols);
        this.isPlaying = false;
        this.baseSpeed = 1000;
        this.speed = 0;
        this.interval = null;
        this.element = null;

        this.next = this.next.bind(this);

        this._init();
    }

    next() {
        this.grid.next();
    }

    play() {
        this.isPlaying = true;
        this._startInterval();
    }

    pause() {
        this.isPlaying = false;
        this._stopInterval();
    }

    reset() {
        this.pause();
        this.grid.reset();
    }

    randomize() {
        if (this.isPlaying) return;

        this.reset();
        this.grid.randomize();
    }

    changeSpeed(value) {
        this.speed = value;
        this._stopInterval();
        this._startInterval();
    }

    _init() {
        this._createControls();
        this._render
    }

    _createControls() {
        const startButton = document.createElement('button');
        startButton.className = 'material-icons';
        startButton.textContent = 'play_arrow';
        startButton.addEventListener('click', () => {
            if (this.isPlaying) {
                this.pause();
                startButton.textContent = 'play_arrow';
            } else {
                this.play();
                startButton.textContent = 'pause';
            }
        });

        const resetButton = document.createElement('button');
        resetButton.className = 'material-icons';
        resetButton.textContent = 'replay';
        resetButton.addEventListener('click', () => {
            startButton.textContent = 'play_arrow';
            this.reset();
        });

        const randomizeButton = document.createElement('button');
        randomizeButton.className = 'material-icons';
        randomizeButton.textContent = 'transform';
        randomizeButton.addEventListener('click', () => {
            startButton.textContent = 'play_arrow';
            this.randomize();
        });

        const speedSlider = document.createElement('input');
        speedSlider.type = 'range';
        speedSlider.min = 0;
        speedSlider.max = 900;
        speedSlider.step = 100;
        speedSlider.value = this.speed;
        speedSlider.addEventListener('input', () => this.changeSpeed(speedSlider.value));

        const container = document.createElement('div');
        container.className = 'controls';

        container.append(startButton, resetButton, randomizeButton, speedSlider);

        this.controlsElement = container;
    }

    _render() {
        root.appendChild(this.grid.element);
        root.appendChild(this.controlsElement);
    }

    _startInterval() {
        this.interval = setInterval(this.next, this.baseSpeed - this.speed);
    }

    _stopInterval() {
        clearInterval(this.interval);
    }
}