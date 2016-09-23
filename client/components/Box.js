import Entity from '../proton/Entity'

const componentToHex = c => {
  const hex = parseInt(c, 10).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

const colorTween = (p, fromColor, toColor) => {
  let r1 = fromColor.slice(1, 3)
  let g1 = fromColor.slice(3, 5)
  let b1 = fromColor.slice(5, 7)
  let r2 = toColor.slice(1, 3)
  let g2 = toColor.slice(3, 5)
  let b2 = toColor.slice(5, 7)

  r1 = parseInt(r1, 16)
  g1 = parseInt(g1, 16)
  b1 = parseInt(b1, 16)
  r2 = parseInt(r2, 16)
  g2 = parseInt(g2, 16)
  b2 = parseInt(b2, 16)

  let r = ((1 - p) * r1 + p * r2 + 0.5)
  let g = ((1 - p) * g1 + p * g2 + 0.5)
  let b = ((1 - p) * b1 + p * b2 + 0.5)

  r = componentToHex(r)
  g = componentToHex(g)
  b = componentToHex(b)
  return `#${r + g + b}`
}

export default class Box extends Entity {
  constructor(...args) {
    super(...args)

    this.bgColor = '#FAE766'
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.coord.x, this.coord.y)
    ctx.rotate(this.angle)
    ctx.fillStyle = this.bgColor
    ctx.lineWidth = 2
    const x = -this.width / 2
    const y = -this.height / 2
    ctx.scale(this.scale, this.scale)
    ctx.fillRect(x, y, this.width, this.height)
    ctx.strokeStyle = '#8B8C8B'
    ctx.strokeRect(x, y, this.width, this.height)
    ctx.restore()
  }

  onDie() {
    const originColor = this.bgColor
    this.tweens.add('injured', 200, percent => {
      this.scale = 1.25 - Math.abs(0.5 - percent) / 2
      this.bgColor = colorTween(0.5 - Math.abs(0.5 - percent), originColor, '#ff0000')
    }, 'easeInQuad')
  }
}
