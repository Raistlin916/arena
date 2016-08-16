export default class Human {
  constructor(bundle) {
    this.world = bundle.world
    this.entity = bundle.entity
  }

  hear(pack) {
    this.entity.receivePack(pack)
  }

  bindRoar(fn) {
    this.entity.onReconciliation = fn
  }

  destroy() {
    this.world.remove(this.entity)
  }
}
