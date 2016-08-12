import HeroCore from '../../core/components/Hero'


export default class Hero extends HeroCore {
  constructor(bundle, world, input) {
    super(bundle, world)
    this.input = input
    this.pendingInputs = []
    this.inputSeq = 0

    if (input) {
      this.world.socket.on('reconciliation', data => this.onReconciliation(data.seq, data.bundle))
    }
  }

  onReconciliation(seq, bundle) {
    this.pendingInputs = this.pendingInputs.filter(item => item.seq > seq)
    this.merge(bundle)
    this.pendingInputs.forEach(item => this.applyInput(item.dt, item.activeMap))
  }

  packageInput(dt) {
    if (this.pendingInputs.length >= 100) {
      return
    }

    const activeMap = JSON.parse(JSON.stringify(this.input.activeMap))
    const currentPackage = {
      dt,
      activeMap,
      seq: this.inputSeq ++
    }
    this.pendingInputs.push(currentPackage)

    this.applyInput(currentPackage.dt, currentPackage.activeMap)

    setTimeout(() => {
      this.world.socket.emit('input_pack', currentPackage)
    }, 500)
  }

  update(dt) {
    if (this.input) {
      this.packageInput(dt)
    } else {
      super.update(dt)
    }
  }
}
