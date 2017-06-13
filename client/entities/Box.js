import Entity from './Entity'
import Position from '../components/Position'
import Transform from '../components/Transform'
import Size from '../components/Size'
import Collision from '../components/Collision'

export default class Box extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
    this.size = new Size(20, 20)
    this.collision = new Collision('circle')
    this.HP = 100
  }
}
