import HeroCore from './HeroCore'
import Bullet from './Bullet'

class Gun {
  constructor() {
    this.fireInterval = 0.1
    this.cooldown = true
    this.elapseAfterFired = 0
  }

  tryToFire(world, coord, direction) {
    if (!this.cooldown) {
      return
    }
    world.add(new Bullet({
      coord,
      velocity: direction.scale(200, 200)
    }))
    this.cooldown = false
  }

  update(dt) {
    if (this.cooldown) {
      return
    }
    this.elapseAfterFired += dt
    if (this.elapseAfterFired >= this.fireInterval) {
      this.cooldown = true
      this.elapseAfterFired = 0
    }
  }
}


export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.inputSeq = null
    this.elapseAfterSync = 0

    this.gun = new Gun()
  }

  receivePack(pack) {
    this.applyInput(pack.dt, pack.activeMap)
    this.inputSeq = pack.seq
  }

  applyInput(dt, activeMap) {
    if (activeMap.space) {
      this.gun.tryToFire(this.world, this.centerCoord.clone(), this.direction.clone())
    }
    super.applyInput(dt, activeMap)
  }

  update(dt) {
    this.elapseAfterSync += dt
    if (this.elapseAfterSync > 1) {
      this.onReconciliation(this.inputSeq, this.export())
      this.elapseAfterSync = 0
    }

    this.gun.update(dt)
  }
}
