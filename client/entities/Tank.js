import Entity from './Entity'
import Position from '../components/Position'
import Velocity from '../components/Velocity'
import Input from '../components/Input'
import Steering from '../components/Steering'
import Gun from '../components/Gun'
import Size from '../components/Size'

export default class Tank extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.size = new Size(20, 20)
    this.gun = new Gun(30, 20, { x: this.size.w, y: this.size.h / 2 })
    this.position = new Position(pos.x, pos.y)
    this.velocity = new Velocity(velocity)
    this.steering = new Steering(0, Math.PI, 100)
    this.input = new Input()
  }
}
