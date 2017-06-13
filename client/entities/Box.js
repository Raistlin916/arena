import Entity from './Entity'
import Position from '../components/Position'
import Display from '../components/Display'
import Velocity from '../components/Velocity'
import Size from '../components/Size'
import Collision from '../components/Collision'
import Life from '../components/Life'

export default class Box extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.display = new Display()
    this.position = new Position(pos.x, pos.y)
    this.velocity = new Velocity(velocity)
    this.size = new Size(20, 20)
    this.collision = new Collision('circle')
    this.life = new Life(100)
  }
}
