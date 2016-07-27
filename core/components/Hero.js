import PolarEntity from '../proton/PolarEntity'
import Bullet from '../components/Bullet'

export default class Hero extends PolarEntity {
  constructor(config, world, input) {
    super(Object.assign({
      width: 10,
      height: 10
    }, config))

    this.color = config.color
    this.world = world
    this.direction = 0

    if (input) {
      input.on('turnWheel', e => {
        this.onTurnWheel(e)
        this.onEmitBullets(e)
      })
    }
  }

  onTurnWheel(e) {
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

  onEmitBullets(e) {
    if (e.keyName === 'space' && e.type === 'end') {
      this.world.add(new Bullet({
        coord: this.centerCoord,
        velocity: this.direction.clone().scale(500, 500)
      }))
    }
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
