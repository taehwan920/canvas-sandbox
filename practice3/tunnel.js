export class Tunnel {
  constructor(speed, lineWidth, stageWidth, stageHeight) {
    this.speed = speed;
    this.lineWidth = lineWidth;
    this.width = stageWidth;
    this.height = stageHeight;
    this.x = (this.stageWidth - lineWidth) / 2;
    this.y = (this.stageHeight - lineWidth) / 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = `${this.lineWidth}`;
    ctx.strokeStyle = '#000';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  prepareNextRect(stageWidth, stageHeight) {
    this.width = this.width
    this.height = this.height
    this.x = this.x
    this.y = this.y
  }
}