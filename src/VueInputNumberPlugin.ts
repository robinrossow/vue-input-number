import type { App } from 'vue'
import VueInputNumber from './components/VueInputNumber.vue'

export default {
    install: (app: App) => {
        app.component('VueInputNumber', VueInputNumber)
    }
}

export { VueInputNumber }
