import WorldCore from '../../core/proton/World'
import ControlledHero from '../components/ControlledHero'
import Hero from '../../core/components/Hero'
import Box from '../../core/components/Box'
import Bullet from '../../core/components/Bullet'
import Ground from '../../core/components/Ground'
import Input from './Input'
import RenderTimer from './RenderTimer'

const classMap = { Box, Hero, Bullet, Ground }

export default class World extends WorldCore {

  constructor(bundle, canvas, socket) {
    super(bundle)
    this.ctx = canvas.getContext('2d')
    this.info = {
      width: canvas.width,
      height: canvas.height
    }
    this.socket = socket

    this.input = new Input(this.socket)

    this.initRenderTimer()
    this.initSocket(socket)
  }

  run() {
    this.timer.cancelFrame()
    const round = dt => {
      this.timer.requestFrame(round)

      this.objects.forEach(item => {
        if (item.isDead) {
          return this.remove(item)
        }
        if (item.gid === this.userGid) {
          return item.update(dt, this)
        }
        if (item.updateInterpolate) {
          return item.updateInterpolate(dt, this)
        }
        return item.update(dt, this)
      })
    }
    this.timer.requestFrame(round)
  }

  initSocket(socket) {
    socket.on('init', data => {
      this.userGid = data.gid
      data.entities.forEach(item => {
        const entity = this.entityFactory(item.className, item)
        return this.add(entity)
      })
    })

    socket.on('sync', data => {
      this.objects.forEach(item => {
        if (item.gid === this.userGid) {
          return
        }
        if (item.className === 'Box') {
          return
        }
        const exist = data.entities.some(entity => {
          if (entity.gid === item.gid) {
            if (item.setInterpolate) {
              item.setInterpolate(entity)
            }
            data.entities.splice(data.entities.indexOf(entity), 1)
            return true
          }
          return false
        })
        if (!exist) {
          item.die()
        }
      })
      data.entities.forEach(item => {
        if (item.gid === this.userGid) {
          return
        }
        if (item.className === 'Box') {
          return
        }
        const entity = this.entityFactory(item.className, item)
        this.add(entity)
      })
    })

    socket.on('disconnect', () => console.error('socket disconnected'))
  }

  initRenderTimer() {
    this.renderTimer = new RenderTimer()
    const round = () => {
      this.renderTimer.requestFrame(round)
      this.objects.forEach(item => item.render(this.ctx, this.info))
    }
    this.renderTimer.requestFrame(round)
  }

  entityFactory(className, bundle) {
    if (this.userGid === bundle.gid) {
      this.entityOfUser = new ControlledHero(bundle, this, this.input)
      return this.entityOfUser
    }
    return new classMap[className](bundle, this)
  }
}
