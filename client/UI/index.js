import Text from './Text'

export default class UI {
  constructor() {
    this.components = []
    this.components.push(
      new Text({ x: 10, y: 20 },
        () => (this.data.onlineNum === undefined ? '' : `online: ${this.data.onlineNum}`),
        { fontSize: 14 })
    )

    this.data = {}
  }

  render(ctx) {
    this.components.forEach(item => item.render(ctx))
  }

  setData(data) {
    this.data.onlineNum = data.onlineNum
  }
}
