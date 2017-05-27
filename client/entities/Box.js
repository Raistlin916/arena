import Entity from './Entity'
import Position from '../components/Position'
import Transform from '../components/Transform'

export default class Box extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
  }
}
