import World from '../proton/World'
import Timer from '../proton/Timer'
import Box from '../components/Box'
import Hero from '../components/Hero'

import Human from './Human.js'
import EventEmitter from '../lib/EventEmitter'

export default class Rules {
  constructor() {
    this.world = new World({
      timer: new Timer()
    })
    this.world.run()

    for (let i = 0; i < 10; i ++) {
      this.world.add(new Box({
        coord: { x: 150 + i * 11, y: 50 },
        width: 10,
        height: 10
      }))
    }

  }

  receiveAction(data) {

    this.input.emit(data.eventName, data)
  }

  addHuman(id) {
    const input = new EventEmitter()
    const hero = new Hero({
      coord: { x: 100, y: 50 },
      color: 'yellow',
      name: `匿名#${id}`
    }, this.world, input)

    this.world.add(hero)

    return new Human(id, {
      ear: input,
      world: this.world,
      entity: hero
    })
  }

  getEnities() {
    return this.world.export()
  }
}
