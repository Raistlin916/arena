import World from '../proton/World'
import Timer from '../proton/Timer'
import Box from '../components/Box'

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

  getEnities() {
    return this.world.export()
  }
}
