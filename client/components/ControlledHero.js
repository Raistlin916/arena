import Hero from '../../server/components/HeroCore'


export default class ControlledHero extends Hero {
  constructor(bundle, world, input) {
    super(bundle, world)
    this.input = input
    this.pendingInputs = []
    this.inputSeq = 0
    this.world.socket.on('reconciliation', data => this.onReconciliation(data.seq, data.bundle))
  }

  onReconciliation(seq, bundle) {
    this.pendingInputs = this.pendingInputs.filter(item => item.seq > seq)
    this.merge(bundle)
    this.pendingInputs.forEach(item => this.applyInput(item.dt, item.activeMap))
  }

  packageInput(dt) {
    if (this.pendingInputs.length >= 100) {
      console.log('lag')
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
    this.world.socket.emit('input_pack', currentPackage)
  }

  update(dt) {
    this.packageInput(dt)
  }
}
