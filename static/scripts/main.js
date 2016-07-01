import World from './proton/World'
import Ground from './components/ground'
import Player from './components/player'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500

const world = new World(canvas)
world.run()

const ground = new Ground(world)
const player = new Player(world, {
  coord: { x: 20, y: 10 },
  color: 'yellow'
})

