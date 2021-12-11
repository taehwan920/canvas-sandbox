import { Ball } from './ball.js'


class App {
  frame = 0;
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.canvas.addEventListener('mousedown', this.onDown.bind(this), false)
    this.canvas.addEventListener('mousemove', this.onMove.bind(this), false)
    this.canvas.addEventListener('mouseup', this.onUp.bind(this), false)
    this.frame = 0;

    this.currentX = -1;
    this.currentY = -1;
    this.ball1 = new Ball(this.stageWidth / 3, this.stageHeight / 2, 50, '#4aa82e');
    this.ball2 = new Ball(this.stageWidth / 3 * 2, this.stageHeight / 2, 40, '#f08888')
    window.requestAnimationFrame(this.animate.bind(this))
  }

  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    this.canvas.width = this.stageWidth * this.pixelRatio
    this.canvas.height = this.stageHeight * this.pixelRatio
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.frame++

    this.ball1.draw(
      this.ctx,
      this.stageWidth,
      this.stageHeight,
      this.isMouseDown,
      this.currentX,
      this.currentY,
      this.impulse,
      [this.ball2]
    );
    this.ball2.draw(
      this.ctx,
      this.stageWidth,
      this.stageHeight,
      this.isMouseDown,
      this.currentX,
      this.currentY,
      this.impulse,
      [this.ball1]
    );
  }

  onDown(e) {
    this.isMouseDown = true
    this.startX = e.clientX
    this.startY = e.clientY
    this.startFrame = this.frame
  }
  onMove(e) {
    if (this.isMouseDown) {
      this.currentX = e.clientX
      this.currentY = e.clientY
      this.getImpulse()
    }
  }
  onUp() {
    this.isMouseDown = false;
    this.impulse = { vx: 0, vy: 0 }
  }

  getImpulse() {
    const dx = this.currentX - this.startX
    const dy = this.currentY - this.startY
    const velocityX = dx / (this.frame - this.startFrame) * 3
    const velocityY = dy / (this.frame - this.startFrame) * 3

    this.impulse = { vx: velocityX, vy: velocityY }
  }
}

window.onload = () => {
  new App();
}