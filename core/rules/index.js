import World from '../proton/World'
import Timer from '../proton/Timer'
import Box from '../components/Box'
import Hero from '../components/Hero'

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


    this.input = new Input()
    this.hero = new Hero({
      coord: { x: 100, y: 50 },
      color: 'yellow',
    }, this.world, this.input)
    this.world.add(this.hero)
  }

  receiveAction(data) {
    this.input.emit(data.eventName, data)
  }

  getEnities() {
    return this.world.export()
  }
}
