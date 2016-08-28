import ctxUtils from '../lib/ctxUtils'

export default class Text {
  constructor(coord, text = '', opt = {}) {
    this.coord = coord
    this.color = '#666'
    this.text = text
    this.textAlign = opt.fontSize || 'center'
    this.fontSize = opt.fontSize || 16
  }

  set(text) {
    this.text = text
  }

  setColor(color) {
    this.color = color
  }

  render(ctx) {
    let text
    if (typeof this.text === 'function') {
      text = this.text()
      if (text === undefined) {
        return
      }
    } else {
      text = this.text
    }

    ctx.save()
    ctx.fillStyle = this.text
    ctx.textAlign = this.textAlign
    ctxUtils.setFontSize(ctx, this.fontSize)
    ctx.fillText(text, this.coord.x, this.coord.y)
    ctx.restore()
  }
}
