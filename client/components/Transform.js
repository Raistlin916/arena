export default class Position {
  constructor(velocity, acc) {
    this.velocity = velocity || { x: 0, y: 0 }
    this.acc = acc || { x: 0, y: 0 }
  }
}
