game.board = {
  game: game,
  size: 15,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },
  createCell(row, col) {
    const cellSize = this.game.sprites.cell.width + 1;
    const offsetX = (this.game.width - cellSize * this.size) / 2;
    const offsetY = (this.game.height - cellSize * this.size) / 2;
    return {
      row: row,
      col: col,
      x: offsetX + cellSize * col,
      y: offsetY + cellSize * row,
    };
  },
  getRandomAvailableCell() {
    const pool = this.cells.filter((cell) => !this.game.snake.hasCell(cell));
    const index = game.randomInteger(0, pool.length - 1);
    return pool[index];
  },
  createFood() {
    const cell = this.getRandomAvailableCell();
    cell.hasFood = true;
  },
  getCell(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
      if (cell.hasFood) {
        this.game.ctx.drawImage(this.game.sprites.food, cell.x, cell.y);
      }
    });
  },
};
