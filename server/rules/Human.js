export default class Human {
  constructor(id, bundle) {
    this.id = id

    this.world = bundle.world
    this.ear = bundle.ear
    this.entity = bundle.entity
  }

  hear(data) {
    this.ear.emit(data.eventName, data)
  }

  destroy() {
    this.world.remove(this.entity)
  }
}
