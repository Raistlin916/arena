import Input from './components/Input'

const canvas = document.querySelector('canvas')
canvas.width = 500
canvas.height = 500
const ctx = canvas.getContext('2d')
const { width, height } = canvas

const playerCoord = { x: 10, y: 10 }

function drawPlayer() {
  ctx.save()
  ctx.fillStyle = 'red'
  ctx.fillRect(playerCoord.x, playerCoord.y, 5, 5)
  ctx.restore()
}

function round() {
  requestAnimationFrame(round)

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'grey'
  ctx.fillRect(0, 0, width, height)
  drawPlayer()
}
round()


const input = new Input()
input.on('turnWheel', () => {
  playerCoord.x += 10
  playerCoord.y += 10
})
