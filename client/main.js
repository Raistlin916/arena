import Business from './business'
import World from './World'

import Box from './entities/Box'
import Tank from './entities/Tank'

const getSize = () => {
  const container = document.querySelector('.container')
  return {
    width: container.clientWidth,
    height: container.clientHeight
  }
}

window.onload = () => {
  const onLogin = name => {
    const size = getSize()
    const canvas = document.querySelector('canvas')
    canvas.width = size.width
    canvas.height = size.height
    const socket = window.io()
    const world = new World({
      userData: { name }
    }, canvas, socket)
    world.run()

    world.addEntity(new Box({ x: 100, y: 100 }))
    world.addEntity(new Tank({ x: 100, y: 100 }))
  }
  new Business(onLogin)
}

