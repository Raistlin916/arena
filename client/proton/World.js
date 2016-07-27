import WorldCore from '../../core/proton/World'
import Hero from '../components/Hero'
import Box from '../../core/components/Box'
import Bullet from '../../core/components/Bullet'
import Input from './Input'

const classMap = { Box, Hero, Bullet }

export default class World extends WorldCore {

  constructor(bundle, canvas, socket) {
    super(bundle)
    this.ctx = canvas.getContext('2d')
    this.info = {
      width: canvas.width,
      height: canvas.height
    }
    this.socket = socket
    socket.on('init', data =>
      data.enities.forEach(item => {
        const targetClass = classMap[item.className]
        if (targetClass === Hero) {
          const input = new Input(this.socket)
          return this.add(new classMap[item.className](item, this, input))
        }
        return this.add(new classMap[item.className](item, this))
      }
    ))
  }

  onIterate(objs, dt) {
    super.onIterate(objs, dt)
    objs.forEach(item => item.render(this.ctx, this.info))
  }
}
