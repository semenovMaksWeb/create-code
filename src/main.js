import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueHighlight from 'vue-highlight.js';
// import VueHighlightJS from 'highlight.js'
// import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/default.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createApp(App)
    .use(store)
    .use(router)
    .use(VueHighlight, { languages: ['json'] }).mount('#app');
//# sourceMappingURL=main.js.map