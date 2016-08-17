export default class Camera {
  setSize(size) {
    this.size = size
  }

  capture(targetEntity) {
    this.capturedEntity = targetEntity
  }

  render(ctx) {
    if (!this.capturedEntity) {
      return
    }
    const capturedCood = this.capturedEntity.coord.clone()
    ctx.save()
    ctx.clearRect(0, 0, this.size.width, this.size.height)
    ctx.translate(-capturedCood.x + this.size.width / 2, -capturedCood.y + this.size.height / 2)
  }

  endRender(ctx) {
    if (!this.capturedEntity) {
      return
    }
    ctx.restore()
  }
}
