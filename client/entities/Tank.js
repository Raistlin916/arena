import Entity from './Entity'
import Position from '../components/Position'
import Transform from '../components/Transform'
import Input from '../components/Input'
import Steering from '../components/Steering'
import Gun from '../components/Gun'

export default class Tank extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()

    const gunWidth = 30
    const gunHeight = 20
    const width = 50
    const height = 50
    this.gun = new Gun(gunWidth, gunHeight, { x: width - 10, y: height / 2 - 10 })

    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
    this.steering = new Steering(0, Math.PI, 100)
    this.input = new Input()
  }
}
