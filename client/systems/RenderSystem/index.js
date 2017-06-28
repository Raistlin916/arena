import BoxDisplay from './display/BoxDisplay'
import BulletDisplay from './display/BulletDisplay'
import TankDisplay from './display/TankDisplay'

const displayMap = {
  BoxDisplay, BulletDisplay, TankDisplay
}

export default class RenderSystem {
  render(ctx, entity, world) {
    if (!entity.position) {
      return
    }
    const display = new displayMap[`${entity.constructor.name}Display`]()
    display.render(ctx, entity, world)
  }
}
