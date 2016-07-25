import PolarEntity from '../../core/proton/PolarEntity'
import Input from '../proton/Input'
import Bullet from '../../core/components/Bullet'

export default class Player extends PolarEntity {
  constructor(config) {
    super(Object.assign({
      width: 10,
      height: 10
    }, config))

    this.color = config.color
    this.world = config.world

    this.input = new Input()
    this.direction = 0


    this.input.on('turnWheel', e => {
      this.handleTurnWheel(e)
      this.emmitBullets(e)
    })
  }

  handleTurnWheel(e) {
    if (e.keyName === 'left') {
      this.speedOfRotate = e.type === 'end' ? 0 : -180
    } else if (e.keyName === 'right') {
      this.speedOfRotate = e.type === 'end' ? 0 : 180
    } else if (e.keyName === 'top') {
      this.speed = e.type === 'end' ? 0 : 100
    } else if (e.keyName === 'bottom') {
      this.speed = e.type === 'end' ? 0 : -100
    }
  }

  emmitBullets(e) {
    if (e.keyName === 'space' && e.type === 'end') {
      this.world.add(new Bullet({
        coord: this.centerCoord,
        velocity: this.direction.clone().scale(500, 500)
      }))
    }
  }

  update(dt) {
    super.update(dt)
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)
    ctx.fillStyle = this.color
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -this.height / 2 - 3)
    ctx.strokeStyle = 'red'
    ctx.stroke()
    ctx.restore()
  }
}
