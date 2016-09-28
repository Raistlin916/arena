import Entity from '../proton/Entity'

export default class Life extends Entity {
  constructor(bundle) {
    super(bundle)
    this.life = 100
    this.damage = 50
  }

  damaged(causeTarget) {
    if (this.isDead) {
      return
    }
    if (!causeTarget instanceof Life) {
      throw new Error('must be damaged by Life');
    }
    this.life -= causeTarget.damage
    if (this.life <= 0) {
      this.die()
    }
  }
}
