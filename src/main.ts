import { createApp } from 'vue'
import App from './App.vue'
import './styles/variables.css'
import './styles/base.css'
import { vUpload } from './directives'

const app = createApp(App)
app.directive('upload', vUpload)
app.mount('#app')
