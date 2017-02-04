import 'normalize.css'
import './styles/index.scss'

export default class Business {
  constructor() {
    this.initLoginComponent()
  }

  initLoginComponent() {
    const loginWrap = document.querySelector('.js-login-wrap')
    const nameInput = document.querySelector('.js-name-input')
    document.querySelector('.js-spawn-btn').onclick = () => {
      loginWrap.style.display = 'none';
      this.onLogin(nameInput.value)
    }
  }
}
