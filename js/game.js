const game = {
  start: function () {
    const canvas = document.getElementById("mycanvas");
    const ctx = canvas.getContext("2d");

    const background = new Image();
    background.src = "img/background.png";
    background.addEventListener("load", () => {
      window.requestAnimationFrame(() => {
        ctx.drawImage(background, 0, 0);
      });
    });
  },
};

game.start();
