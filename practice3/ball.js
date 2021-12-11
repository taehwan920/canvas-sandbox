export class Ball {
  constructor(x, y, radius, color) {
    this.radius = radius;
    this.friction = 0.92
    this.x = x
    this.y = y
    this.vx = 0;
    this.vy = 0;
    this.color = color;
  }

  draw(ctx, stageWidth, stageHeight, isMouseDown, mouseX, mouseY, impulse = { vx: 0, vy: 0 }, otherBalls) {
    this.x += this.vx;
    this.y += this.vy;

    if (isMouseDown) { this.bounceCursor(mouseX, mouseY, impulse) }
    otherBalls.forEach(otherBall => {
      this.bounceBall(otherBall)
    })
    this.bounceWindow(stageWidth, stageHeight)

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();


    this.vx *= this.friction
    this.vy *= this.friction
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceCursor(mouseX, mouseY, impulse) {
    const distance = Math.sqrt(Math.pow(this.x - mouseX, 2) + Math.pow(this.y - mouseY, 2))
    // const isCollided = Math.abs(distance - this.radius) < 10
    const isCollided = distance <= this.radius

    if (isCollided) {
      this.vx = impulse.vx;
      this.vy = impulse.vy;
    }
  }

  bounceBall(otherBall) {
    const distance = Math.sqrt(Math.pow(this.x - otherBall.x, 2) + Math.pow(this.y - otherBall.y, 2))
    const isCollided = distance <= this.radius + otherBall.radius
    // const isCollided = Math.abs(distance - (this.radius + otherBall.radius)) < 10

    if (isCollided) {
      otherBall.vx = this.vx
      otherBall.vy = this.vy
      this.vx = 0
      this.vy = 0
    }
  }
}