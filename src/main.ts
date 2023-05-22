import InputNumberPlugin from '@/VueInputNumberPlugin'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(InputNumberPlugin)
    .mount('#app')
