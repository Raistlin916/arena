import World from '../proton/World'
import Box from '../components/Box'
import Hero from '../components/Hero'

import Human from './Human.js'

export default class Rules {
  constructor() {
    this.world = new World()
    this.world.run()

    for (let i = 0; i < 10; i++) {
      this.world.add(new Box({
        coord: { x: 150 + i * 30, y: 50 },
        width: 20,
        height: 20
      }))
    }
  }

  addHuman(name) {
    const hero = new Hero({
      coord: { x: 100, y: 50 },
      name
    }, this.world)
    this.world.add(hero)

    return new Human({
      world: this.world,
      entity: hero
    })
  }

  getEntities() {
    return this.world.export()
  }
}
