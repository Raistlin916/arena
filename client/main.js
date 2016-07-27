import World from './proton/World'
import Timer from './proton/Timer'
import Ground from './components/Ground'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500

canvas.style.marginLeft = '10px'
canvas.style.marginTop = '10px'

const socket = io()
const world = new World({ timer: new Timer() }, canvas, socket)
world.run()

const ground = new Ground()
world.add(ground)
