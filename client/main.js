import World from './proton/World'
import Timer from './proton/Timer'
import Ground from './components/Ground'
import Player from './components/Player'
import Box from '../core/components/Box'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500

canvas.style.marginLeft = '10px'
canvas.style.marginTop = '10px'

const world = new World({ timer: new Timer() }, canvas)
world.run()

const ground = new Ground()
const player = new Player({
  coord: { x: 50, y: 50 },
  color: 'yellow',
  world
})
world.add(ground)
world.add(player)

const classMap = { Box }

const socket = io()
socket.on('init', data =>
  data.enities.forEach(item =>
    world.add(new classMap[item.className](item))
))
