import Entity from './Entity'
import Position from '../components/Position'
import Transform from '../components/Transform'
import Size from '../components/Size'

export default class Bullet extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.position = new Position(pos.x, pos.y)
    this.transform = new Transform(velocity)
    this.size = new Size(5, 5)
    this.collision = {
      type: 'circle'
    }
  }
}
