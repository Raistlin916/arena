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

    this.components = [
      onlineNum
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

    const { w: viewWidth, h: viewHeight } = this.data.viewInfo
    const radioView = new RadioView(
      { x: viewWidth - 120, y: viewHeight - 120 },
      { w: 100, h: 100 },
      () => this.data.worldInfo.size,
      () => this.user.coord.clone()
    )
    this.components.push(radioView)
  }
}
