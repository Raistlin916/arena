export default {
  setFontSize: (ctx, fontSize) => {
    ctx.font = ctx.font.replace(/\d+px/, `${fontSize}px`)
  }
}
