import Business from './business'
import World from './proton/World'

const getSize = () => {
  const container = document.querySelector('.container')
  return {
    width: container.clientWidth,
    height: container.clientHeight
  }
}

window.onload = () => {
  const busi = new Business()
  busi.onLogin = name => {
    const size = getSize()
    const canvas = document.querySelector('canvas')
    canvas.width = size.width
    canvas.height = size.height
    const socket = window.io()
    const world = new World({
      userData: { name }
    }, canvas, socket)
    world.run()
  }
}

