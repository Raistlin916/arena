const v = {
  add(v1, v2) {
    return {
      x: v1.x + v2.x,
      y: v1.y + v2.y
    }
  },
  sub(v1, v2) {
    return {
      x: v1.x - v2.x,
      y: v1.y - v2.y
    }
  },
  getLength({ x, y }) {
    return Math.sqrt(x * x, y * y)
  },
  isVector(vector) {
    return vector && !isNaN(vector.x) && !isNaN(vector.y)
  },
  setAngle(vector, angle) {
    const len = this.isVector(vector) ? v.getLength(vector) : vector
    return {
      x: Math.cos(angle) * len,
      y: Math.sin(angle) * len
    }
  },
  reverse(vector) {
    return {
      x: -vector.x,
      y: -vector.y
    }
  },
  norm(vector) {
    return v.scale(vector, 1 / v.getLength(vector))
  },
  scale(vector, scale) {
    return {
      x: vector.x * scale,
      y: vector.y * scale
    }
  }
}

export default v
