/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawing = false;
c.lineWidth = 0.4;
// c.globalCompositeOperation = "lighten";

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.maxSize = Math.random() * 7 + 2;
    this.size = Math.random() * 1 + 2;
    this.vs = Math.random() * 0.2 + 0.05;
    this.angleX = Math.random() * 6.2;
    this.vax = Math.random() * 0.6 - 0.3;
    this.angleY = Math.random() * 6.2;
    this.vay = Math.random() * 0.6 - 0.3;
    this.lightness = 10;
  }
  update() {
    this.x += this.speedX + Math.sin(this.angleX);
    this.y += this.speedY + Math.sin(this.angleY);
    this.size += this.vs;
    this.angleX += this.vax;
    this.angleY += this.vay;
    if (this.lightness < 70) this.lightness += 0.25;
    if (this.size < this.maxSize) {
      c.beginPath();
      c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      c.fillStyle = "hsl(140,100%," + this.lightness + "%)";
      c.fill();
      c.stroke();
      requestAnimationFrame(this.update.bind(this));
    } else {
      const flower = new Flower(this.x, this.y, this.size);
      flower.grow();
    }
  }
}

class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vs = Math.random() * 0.3 + 0.2;
    this.maxFlowerSize = this.size + Math.random() * 150;
    this.image = new Image();
    this.image.src = "flowers.png";
    this.frameSize = 100;
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.size > 8.5 ? (this.willFlower = true) : (this.willFlower = false);
    this.angle = 0;
    this.va = Math.random() * 0.05 - 0.025;
  }
  grow() {
    if (this.size < this.maxFlowerSize && this.willFlower) {
      this.size += this.vs;
      this.angle = this.va;

      c.save();
      c.translate(this.x, this.y);
      c.rotate(this.angle);
      c.drawImage(
        this.image,
        this.frameSize * this.frameX,
        this.frameSize * this.frameY,
        this.frameSize,
        this.frameSize,
        0 - this.size / 2,
        0 - this.size / 2,
        this.size,
        this.size,
      );
      c.restore();
      requestAnimationFrame(this.grow.bind(this));
    }
  }
}

window.addEventListener("pointermove", function (e) {
  if (drawing) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});
window.addEventListener("pointerdown", function (e) {
  drawing = true;
  for (let i = 0; i < 30; i++) {
    const root = new Root(e.x, e.y);
    root.update();
  }
});

window.addEventListener("pointerup", function (e) {
  drawing = false;
});
