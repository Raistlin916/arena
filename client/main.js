import World from './proton/World'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500

canvas.style.marginLeft = '10px'
canvas.style.marginTop = '10px'

const socket = io()
const world = new World({}, canvas, socket)
world.run()

