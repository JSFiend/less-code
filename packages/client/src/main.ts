
import './style.css'
import App from './App.vue'
import { piniaSubscribe } from './plugins/pinia-subscribe';
import { piniaGlobalStore } from './plugins/pinia-global-store';

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaSubscribe).use(piniaGlobalStore);

app.use(pinia);

app.mount('#app')
