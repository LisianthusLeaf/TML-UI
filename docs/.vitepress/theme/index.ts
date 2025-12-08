import Theme from 'vitepress/theme'
import TmlUI from '../../src/index'
import './custom.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(TmlUI)
  }
}
