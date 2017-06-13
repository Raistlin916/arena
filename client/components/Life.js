export default class Life {
  constructor(HP) {
    this.HP = HP
    this.lastHurtAt = null
    this.deadAt = null
    this.destroyed = false
  }
}
