import PolarEntity from '../proton/PolarEntity'

export default class Hero extends PolarEntity {
  constructor(bundle, world) {
    bundle = Object.assign({
      width: 40,
      height: 40
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

  export() {
    return Object.assign(super.export(), {
      name: this.name
    })
  }
}
