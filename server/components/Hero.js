import HeroCore from './HeroCore'
import Gun from './Gun'

export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.inputSeq = null
    this.elapseAfterSync = 0

    this.gun = new Gun({
      coord: { x: 10, y: 10 }
    })
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
