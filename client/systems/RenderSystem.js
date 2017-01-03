export default class RenderSystem {
  constructor(ctx) {
    this.ctx = ctx
  }

  render(entity) {
    if (!entity.display || !entity.position) {
      return
    }
    entity.display.render(this.ctx, entity)
  }
}
