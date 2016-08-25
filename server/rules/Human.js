export default class Human {
  constructor(bundle) {
    this.world = bundle.world
    this.entity = bundle.entity
  }

  destroy() {
    this.world.remove(this.entity)
  }
}
