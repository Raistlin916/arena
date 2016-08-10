import HeroCore from '../../core/components/Hero'


export default class Hero extends HeroCore {
  update(...args) {
    const { input } = this
    if (input) {
      const { activeMap } = input
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
    }
    super.update(...args)
  }
}
