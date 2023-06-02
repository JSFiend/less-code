import '@/assets/css/base.scss';
import App from './App.vue'
import { piniaSubscribe } from './plugins/pinia-subscribe';
import { piniaGlobalStore } from './plugins/pinia-global-store';
import elementPlusPlugin from '@/plugins/element-plus';

import { router } from '@/router/vue-router';

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaSubscribe).use(piniaGlobalStore);

app.use(pinia).use(router).use(elementPlusPlugin);

app.mount('#app')
