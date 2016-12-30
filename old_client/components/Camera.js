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
    ctx.clearRect(0, 0, this.size.w, this.size.h)
    ctx.translate(-capturedCood.x + this.size.w / 2, -capturedCood.y + this.size.h / 2)
  }

  endRender(ctx) {
    if (!this.capturedEntity) {
      return
    }
    ctx.restore()
  }
}
