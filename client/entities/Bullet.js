import Entity from './Entity'
import Position from '../components/Position'
import Velocity from '../components/Velocity'
import Size from '../components/Size'
import Collision from '../components/Collision'
import Damage from '../components/Damage'
import Life from '../components/Life'
import Display from '../components/Display'

export default class Bullet extends Entity {
  constructor(pos, velocity = { x: 0, y: 0 }) {
    super()
    this.display = new Display()
    this.position = new Position(pos.x, pos.y)
    this.velocity = new Velocity(velocity)
    this.size = new Size(5, 5)
    this.collision = new Collision({
      type: 'circle'
    })
    this.damage = new Damage(30)
    this.life = new Life(100)
  }
}
