import Position from './Position'

export default class Gun {
  constructor(w, h, pos, options) {
    this.position = new Position(pos.x, pos.y)
    this.cooldown = 0.5
    this.lastFiredElapse = this.cooldown

    Object.assign(this, {
      bulletSpeed: 500
    }, options)
  }
}
