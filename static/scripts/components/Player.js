import Obj from '../proton/Obj'
import Input from '../proton/Input'

export default class Player extends Obj {
  constructor(world) {
    super(world)

    this.coord = { x: 0, y: 0 }
    this.input = new Input()
    this.input.on('turnWheel', () => {
      this.coord.x += 10
      this.coord.y += 10
    })
  }

  render(ctx) {
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.coord.x, this.coord.y, 5, 5)
    ctx.restore()
  }
}
