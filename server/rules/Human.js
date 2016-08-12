export default class Human {
  constructor(id, bundle) {
    this.id = id

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
