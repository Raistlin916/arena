import './lib/requestAnimation'
import RenderSystem from './systems/RenderSystem'
import PhysicsSystem from './systems/PhysicsSystem'
import OperatingSystem from './systems/OperatingSystem'

export default class World {
  constructor(bundle, canvas, socket) {
    this.ctx = canvas.getContext('2d')
    this.viewInfo = {
      w: canvas.width,
      h: canvas.height
    }
    this.socket = socket

    this.timestamp = window.performance && window.performance.now ?
      () => window.performance.now() :
      () => new Date().getTime()

    this.renderSystem = new RenderSystem(this.ctx)
    this.physicsSystem = new PhysicsSystem()
    this.operatingSystem = new OperatingSystem()

    this.entities = []
  }

  run() {
    let now
    let dt = 0
    let last = this.timestamp()
    const slow = 1
    const step = 1 / 60
    const slowStep = slow * step

    const frame = () => {
      now = this.timestamp()
      dt += Math.min(1, (now - last) / 1000)
      while (dt > slowStep) {
        dt -= slowStep
        this.update(step)
      }
      this.render()
      last = now
      requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  removeEntity(entity) {
    this.entities.splice(
      this.entities.indexOf(entity), 1
    )
  }

  render() {
    this.ctx.clearRect(0, 0, this.viewInfo.w, this.viewInfo.h)
    this.entities.forEach(entity =>
      this.renderSystem.render(entity)
    )
  }

  update(dt) {
    this.entities.forEach(entity => {
      this.operatingSystem.update(entity, dt, this)
      this.physicsSystem.update(entity, dt, this)
    })
  }
}
