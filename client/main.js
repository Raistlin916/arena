import Business from './business'
import World from './proton/World'


const busi = new Business()
busi.onLogin = (name) => {
  const canvas = document.querySelector('canvas')
  canvas.width = 500
  canvas.height = 500
  const socket = io()
  const world = new World({}, canvas, socket)
  world.run()
}
