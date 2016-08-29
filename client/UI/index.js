import Text from './Text'
import RadioView from './RadioView'

export default class UI {
  constructor() {
    const onlineNum = new Text({ x: 10, y: 20 },
        () => (this.data.onlineNum === undefined ? '' : `online: ${this.data.onlineNum}`),
        { fontSize: 14 })
    const radioView = new RadioView({ x: 100, y: 100 },
        () => this.data.worldInfo.size,
        () => this.user.coord.clone())

    this.components = [
      onlineNum,
      radioView
    ]

    this.data = {}
  }

  render(ctx) {
    this.components.forEach(item => item.render(ctx))
  }

  setData(data) {
    this.data = Object.assign({}, this.data, data)
  }

  bindUser(user) {
    this.user = user
  }
}
