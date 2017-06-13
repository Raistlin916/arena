import 'normalize.css'
import './styles/index.scss'

export default class Business {
  constructor(loginAndStartGame) {
    this.loginAndStartGame = loginAndStartGame
    this.initLoginComponent()
  }

  initLoginComponent() {
    this.loginWrap = document.querySelector('.js-login-wrap')
    const nameInput = document.querySelector('.js-name-input')
    document.querySelector('.js-spawn-btn').onclick = () => {
      this.loginWrap.style.display = 'none'
      this.world = this.loginAndStartGame(nameInput.value)
    }

    this.dev()
  }

  dev() {
    this.world = this.loginAndStartGame('test')
    this.loginWrap.style.display = 'none'

    let isRunning = true
    const btn = document.createElement('button')
    btn.innerHTML = isRunning ? 'pause' : 'start'
    document.body.appendChild(btn)
    btn.onclick = () => {
      if (isRunning) {
        this.world.pause()
      } else {
        this.world.run()
      }
      isRunning = !isRunning
      btn.innerHTML = isRunning ? 'pause' : 'start'
    }
  }
}
