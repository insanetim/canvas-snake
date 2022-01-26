const game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
  width: 0,
  height: 0,
  score: 0,
  gameInterval: null,
  bombInterval: null,
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
  sounds: {
    bomb: null,
    food: null,
    theme: null,
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
    this.setTextFont();
  },
  setTextFont() {
    this.ctx.font = "20px Cactus";
    this.ctx.fillStyle = "#FFFFFF";
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
    const required =
      Object.keys(this.sprites).length + Object.keys(this.sounds).length;

    const onAssetLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onAssetLoad);
    this.preloadSounds(onAssetLoad);
  },
  preloadSprites(onAssetLoad) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener("load", onAssetLoad);
    }
  },
  preloadSounds(onAssetLoad) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio();
      this.sounds[key].src = `sounds/${key}.mp3`;
      this.sounds[key].addEventListener("canplaythrough", onAssetLoad, {
        once: true,
      });
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
      this.ctx.fillText("Score: " + this.score, 30, 30);
    });
  },
  update() {
    this.snake.move();
    this.render();
  },
  run() {
    this.create();
    this.gameInterval = setInterval(() => {
      this.update();
    }, 150);
    this.bombInterval = setInterval(() => {
      if (this.snake.moving) {
        this.board.createBomb();
      }
    }, 3000);
  },
  stop() {
    this.sounds.bomb.play();
    clearInterval(this.gameInterval);
    clearInterval(this.bombInterval);
    alert("Game over");
    window.location.reload();
  },
  onSnakeStart() {
    this.sounds.theme.loop = true;
    this.sounds.theme.play();
  },
  onSnakeEat() {
    ++this.score;
    this.sounds.food.play();
    this.board.createFood();
  },
};

window.addEventListener("load", () => game.start());
