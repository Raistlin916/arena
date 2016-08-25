import PolarEntity from '../proton/PolarEntity'

export default class Hero extends PolarEntity {
  constructor(bundle, world) {
    bundle = Object.assign({
      width: 10,
      height: 10
    }, bundle)
    super(bundle)

    this.name = bundle.name || '匿名'
    this.world = world
  }

  applyInput(dt, activeMap) {
    this.speedOfRotate = 0
    this.speed = 0
    if (activeMap.left) {
      this.speedOfRotate = -180
    }
    if (activeMap.right) {
      this.speedOfRotate = 180
    }
    if (activeMap.top) {
      this.speed = 100
    }
    if (activeMap.bottom) {
      this.speed = -100
    }
    super.update(dt)
  }

  render(ctx) {
    ctx.save()

    ctx.translate(this.centerCoord.x, this.centerCoord.y)
    ctx.rotate(this.radiansOfAngle)

    ctx.lineWidth = 1.8
    ctx.strokeStyle = '#8B8C8B'
    ctx.beginPath()
    ctx.moveTo(0, -5)
    ctx.lineTo(25, -5)
    ctx.lineTo(25, 5)
    ctx.lineTo(0, 5)
    ctx.lineTo(0, -5)
    ctx.fillStyle = '#B9B5B5'
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(0, 0, 15, 0, 2 * Math.PI)
    ctx.fillStyle = '#68C9E9'
    ctx.fill()
    ctx.stroke()

    ctx.restore()

    ctx.save()
    ctx.translate(this.centerCoord.x, this.coord.y)
    ctx.fillStyle = '#8A95E3'
    ctx.textAlign = 'center'
    ctx.fontSize = 12
    ctx.fillText(this.name, 0, -15)
    ctx.restore()
  }

  export() {
    return Object.assign(super.export(), {
      name: this.name
    })
  }
}
