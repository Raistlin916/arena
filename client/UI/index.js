import Text from './Text'
import RadioView from './RadioView'

export default class UI {
  constructor(bundle) {
    this.data = {
      viewInfo: bundle.viewInfo
    }

    const onlineNum = new Text({ x: 10, y: 20 },
        () => (this.data.onlineNum === undefined ? '' : `online: ${this.data.onlineNum}`),
        { fontSize: 14 })
    const radioView = new RadioView(
        { x: this.data.viewInfo.w - 120, y: this.data.viewInfo.h - 120 },
        { w: 100, h: 100 },
        () => this.data.worldInfo.size,
        () => this.user.coord.clone()
      )

    this.components = [
      onlineNum,
      radioView
    ]
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
