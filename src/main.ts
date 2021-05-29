import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/solarized-dark.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueClipboard from 'vue3-clipboard'
createApp(App)
  .use(store)
  .use(router)
  .use(VueHighlightJS)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true
  })
  .mount('#app')
