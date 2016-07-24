import World from './proton/World'
import Ground from './components/Ground'
import Player from './components/Player'
import Box from './components/Box'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500

canvas.style.marginLeft = '10px'
canvas.style.marginTop = '10px'

const world = new World(canvas)
world.run()

const ground = new Ground()
const player = new Player({
  coord: { x: 50, y: 50 },
  color: 'yellow',
  world
})
world.add(ground)
world.add(player)


world.add(new Box({
  coord: { x: 20, y: 20 }
}))
