import WorldCore from '../../server/proton/World'
import ControlledHero from '../components/ControlledHero'
import Hero from '../components/Hero'
import Box from '../components/Box'
import Bullet from '../components/Bullet'
import Input from './Input'
import RenderTimer from './RenderTimer'
import Camera from '../components/Camera'
import UI from '../UI'

const classMap = { Box, Hero, Bullet }

export default class World extends WorldCore {

  constructor(bundle, canvas, socket) {
    super(bundle)
    this.ctx = canvas.getContext('2d')
    this.viewInfo = {
      w: canvas.width,
      h: canvas.height
    }
    this.socket = socket

    this.userData = bundle.userData

    this.input = new Input()
    this.initRenderer(this.ctx)
    this.initSocket(socket)
    this.ui = new UI()


    this.layers = {
      bullet: [],
      rest: []
    }
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
        if (item.interpolation) {
          return item.interpolation.update(dt)
        }
        return item.update(dt, this)
      })
    }
    this.timer.requestFrame(round)
  }

  add(obj) {
    if (!super.add(obj)) {
      return
    }

    if (obj.className === 'Bullet') {
      this.layers.bullet.push(obj)
    } else {
      this.layers.rest.push(obj)
    }
  }

  remove(obj) {
    if (!super.remove(obj)) {
      return
    }

    if (obj.className === 'Bullet') {
      this.layers.bullet.splice(this.layers.bullet.indexOf(obj), 1)
    } else {
      this.layers.rest.splice(this.layers.rest.indexOf(obj), 1)
    }
  }

  initSocket(socket) {
    socket.emit('init', {
      userData: {
        name: this.userData.name
      }
    }, data => {
      this.userGid = data.gid
      this.worldInfo = data.worldInfo
      this.ui.setData({ worldInfo: data.worldInfo })
      data.entities.forEach(item => {
        const entity = this.entityFactory(item.className, item)
        return this.add(entity)
      })
      this.camera.capture(this.entityOfUser)
      this.ui.bindUser(this.entityOfUser)
    })

    socket.on('sync', data => {
      this.objects.forEach(item => {
        if (item.gid === this.userGid) {
          return
        }
        const exist = data.entities.some(entity => {
          if (entity.gid === item.gid) {
            if (item.interpolation) {
              item.interpolation.set(entity)
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
        const entity = this.entityFactory(item.className, item)
        this.add(entity)
      })
    })

    socket.on('disconnect', () => console.error('socket disconnected'))

    socket.on('business', data => this.ui.setData(data))
  }

  initRenderer(ctx) {
    this.renderTimer = new RenderTimer()
    this.camera = new Camera()
    this.camera.setSize(this.viewInfo)

    const renderFn = item => {
      if (item.interpolation && !item.interpolation.valid) {
        return
      }
      item.render(ctx, this.viewInfo)
    }

    const round = () => {
      this.renderTimer.requestFrame(round)

      this.camera.render(ctx)
      this.layers.bullet.forEach(renderFn)
      this.layers.rest.forEach(renderFn)
      this.camera.endRender(ctx)

      this.ui.render(ctx)
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
