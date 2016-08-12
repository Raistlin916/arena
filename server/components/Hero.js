import HeroCore from '../../core/components/Hero'

export default class Hero extends HeroCore {
  constructor(...args) {
    super(...args)
    this.inputSeq = null
    this.elapseAfterSync = 0
  }

  receivePack(pack) {
    this.applyInput(pack.dt, pack.activeMap)
    this.inputSeq = pack.seq
  }

  update(dt) {
    this.elapseAfterSync += dt
    if (this.elapseAfterSync > 1) {
      this.onReconciliation(this.inputSeq, this.export())
      this.elapseAfterSync = 0
    }
  }
}
