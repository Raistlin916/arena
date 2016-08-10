import WorldCore from '../../core/proton/World'
import Hero from '../components/Hero'
import Box from '../../core/components/Box'
import Bullet from '../../core/components/Bullet'
import Ground from '../../core/components/Ground'
import Input from './Input'

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

    socket.on('init', data => {
      this.userGid = data.gid
      data.entities.forEach(item => {
        const entity = this.entityFactory(item.className, item)
        return this.add(entity)
      })
    })

    socket.on('sync', data => {
      this.objects.forEach(item => {
        const exist = data.entities.some(entity => {
          if (entity.gid === item.gid) {
            if (item.merge && item.gid !== this.userGid) {
              item.merge(entity)
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
        const entity = this.entityFactory(item.className, item)
        return this.add(entity)
      })
    })
  }

  entityFactory(className, bundle) {
    if (this.userGid === bundle.gid) {
      this.entityOfUser = new classMap[className](bundle, this, this.input)
      return this.entityOfUser
    }
    return new classMap[className](bundle, this)
  }

  onIterate(objs, dt) {
    super.onIterate(objs, dt)
    objs.forEach(item => item.render(this.ctx, this.info))
  }
}
