import HeroCore from '../../core/components/Hero'


export default class Hero extends HeroCore {
  constructor(bundle, world, input) {
    super(bundle, world)
    this.input = input
    this.pendingInputs = []
    this.inputNumber = 0
  }

  packageInput(dt) {
    // if (this.pendingInputs.length >= 50) {
    //   return
    // }

    const activeMap = JSON.parse(JSON.stringify(this.input.activeMap))
    this.pendingInputs.push({
      dt,
      activeMap,
      seq: this.inputNumber ++
    })
    this.applyInput(dt, activeMap)
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

  update(dt) {
    if (this.input) {
      this.packageInput(dt)
    } else {
      super.update(dt)
    }
  }
}
