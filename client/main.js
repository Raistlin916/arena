import Business from './business'
import World from './World'

import Box from './entities/Box'
import Tank from './entities/Tank'
import Bullet from './entities/Bullet'

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

    world.addEntity(new Box({ x: 100, y: 100 }))

    world.addEntity(new Tank({ x: 100, y: 100 }))

    world.addEntity(new Bullet({ x: 50, y: 50 }, { x: 100, y: 0 }))
  }
}

