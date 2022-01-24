const game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
  width: 0,
  height: 0,
  dimensions: {
    max: {
      width: 640,
      height: 360,
    },
    min: {
      width: 300,
      height: 300,
    },
  },
  sprites: {
    background: null,
    cell: null,
    head: null,
    body: null,
    food: null,
    bomb: null,
  },
  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  start() {
    this.init();
    this.preload(() => this.run());
  },
  init() {
    this.canvas = document.getElementById("mycanvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDimensions();
  },
  initDimensions() {
    const data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight,
    };

    this.fitHeight(data);

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },
  fitHeight(data) {
    this.width = Math.floor(
      (data.realWidth * data.maxHeight) / data.realHeight
    );
    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);
    this.height = Math.floor((this.width * data.realHeight) / data.realWidth);
    this.canvas.style.height = "100%";
  },
  preload(callback) {
    let loaded = 0;
    const required = Object.keys(this.sprites).length;
    const onAssetLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    };
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", onAssetLoad);
    }
  },
  create() {
    this.board.create();
    this.snake.create();
    this.board.createFood();
    this.board.createBomb();

    window.addEventListener("keydown", ({ keyCode }) => {
      this.snake.start(keyCode);
    });
  },
  render() {
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(
        this.sprites.background,
        (this.width - this.sprites.background.width) / 2,
        (this.height - this.sprites.background.height) / 2
      );
      this.board.render();
      this.snake.render();
    });
  },
  update() {
    this.snake.move();
    this.render();
  },
  run() {
    this.create();
    setInterval(() => {
      this.update();
    }, 150);
    setInterval(() => {
      if (this.snake.moving) {
        this.board.createBomb();
      }
    }, 3000);
  },
};

game.start();
