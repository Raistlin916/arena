const componentToHex = c => {
  const hex = parseInt(c, 10).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export default {
  setFontSize: (ctx, fontSize) => {
    ctx.font = ctx.font.replace(/\d+px/, `${fontSize}px`)
  },
  colorTween: (p, fromColor, toColor) => {
    let r1 = fromColor.slice(1, 3)
    let g1 = fromColor.slice(3, 5)
    let b1 = fromColor.slice(5, 7)
    let r2 = toColor.slice(1, 3)
    let g2 = toColor.slice(3, 5)
    let b2 = toColor.slice(5, 7)

    r1 = parseInt(r1, 16)
    g1 = parseInt(g1, 16)
    b1 = parseInt(b1, 16)
    r2 = parseInt(r2, 16)
    g2 = parseInt(g2, 16)
    b2 = parseInt(b2, 16)

    let r = ((1 - p) * r1 + p * r2 + 0.5)
    let g = ((1 - p) * g1 + p * g2 + 0.5)
    let b = ((1 - p) * b1 + p * b2 + 0.5)

    r = componentToHex(r)
    g = componentToHex(g)
    b = componentToHex(b)
    return `#${r + g + b}`
  }
}
