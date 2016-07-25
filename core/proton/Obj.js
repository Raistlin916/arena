export default class Obj {
  constructor() {
    this.isDead = false
    this.className = this.constructor.name
  }
  update() {

  }
  render() {

  }
  die() {
    this.isDead = true
  }
}
