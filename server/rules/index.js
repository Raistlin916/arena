import World from '../../core/proton/World'
import Box from '../../core/components/Box'
import Hero from '../components/Hero'
import Ground from '../../core/components/Ground'

import Human from './Human.js'

export default class Rules {
  constructor() {
    this.world = new World()
    this.world.run()

    const ground = new Ground()
    this.world.add(ground)

    for (let i = 0; i < 10; i++) {
      this.world.add(new Box({
        coord: { x: 150 + i * 11, y: 50 },
        width: 10,
        height: 10
      }))
    }
  }

  addHuman(id) {
    const hero = new Hero({
      coord: { x: 100, y: 50 },
      color: `#${((1 << 24) * Math.random() | 0).toString(16)}`,
      name: `匿名#${id}`
    }, this.world)
    this.world.add(hero)

    return new Human(id, {
      world: this.world,
      entity: hero
    })
  }

  getEntities() {
    return this.world.export()
  }
}
