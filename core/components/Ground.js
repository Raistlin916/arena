import Obj from '../../core/proton/Obj'

export default class Ground extends Obj {
  constructor() {
    super()

    this.coord = { x: 0, y: 0 }
  }

  render(ctx, { width, height }) {
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#e5e5e5'
    ctx.fillRect(0, 0, width, height)
  }
}
