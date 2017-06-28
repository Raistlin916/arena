import './lib/requestAnimation'
import Interval from './lib/Interval'
import RenderSystem from './systems/RenderSystem'
import PhysicsSystem from './systems/PhysicsSystem'
import CollisionSystem from './systems/CollisionSystem'
import OperatingSystem from './systems/OperatingSystem'
import LifeSystem from './systems/LifeSystem'

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

    this.interval = new Interval()

    const setRenderMultiple = (ctx, multiple) => {
      const canvas = ctx.canvas
      canvas.style.transformOrigin = 'left top'
      canvas.style.transform = `scale(${1 / multiple}, ${1 / multiple})`
      canvas.width *= multiple
      canvas.height *= multiple
      ctx.scale(multiple, multiple)
    }
    setRenderMultiple(this.ctx, 2)

    this.renderSystem = new RenderSystem()
    this.physicsSystem = new PhysicsSystem()
    this.operatingSystem = new OperatingSystem()
    this.collisionSystem = new CollisionSystem()
    this.lifeSystem = new LifeSystem()

    this.entities = []
    this.elapsed = 0
  }

  addInterval(...args) {
    this.interval.add(...args)
  }

  clearInterval(...args) {
    this.interval.clear(...args)
  }

  run() {
    this.last = this.timestamp()
    if (this.frame) {
      this.rid = requestAnimationFrame(this.frame)
      return
    }
    let now
    let dt = 0
    const slow = 1
    const step = 1 / 60
    const slowStep = slow * step

    this.frame = () => {
      now = this.timestamp()
      dt += Math.min(1, (now - this.last) / 1000)
      while (dt > slowStep) {
        dt -= slowStep
        this.elapsed += step
        this.interval.update(this.elapsed)
        this.update(step)
      }
      this.render()
      this.last = now
      this.rid = requestAnimationFrame(this.frame)
    }

    this.rid = requestAnimationFrame(this.frame)
  }

  pause() {
    cancelAnimationFrame(this.rid)
  }

  getEntities() {
    return this.entities
  }

  addEntity(entity) {
    this.entities.push(entity)
  }

  removeEntity(entity) {
    const index = this.entities.indexOf(entity)
    if (index > -1) {
      this.entities.splice(index, 1)
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.viewInfo.w, this.viewInfo.h)
    this.entities.forEach(entity =>
      this.renderSystem.render(this.ctx, entity, this)
    )
  }

  update(dt) {
    this.entities.forEach(entity => {
      this.operatingSystem.update(entity, dt, this)
      this.physicsSystem.update(entity, dt, this)
      this.collisionSystem.update(entity, dt, this)
      this.lifeSystem.update(entity, dt, this)
    })
  }
}
