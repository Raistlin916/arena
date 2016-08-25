let id = 0

export default class Obj {
  constructor(bundle = {}) {
    this.isDead = false
    this.className = this.constructor.name
    this.gid = bundle.gid ? bundle.gid : id++
  }
  update() {

  }
  render() {

  }
  die() {
    this.isDead = true
  }
  export() {
    return {
      className: this.className,
      gid: this.gid
    }
  }
}
