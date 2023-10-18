import '@/styles/base.scss';
import 'uno.css';
import App from './App.vue';
import { piniaSubscribe } from './plugins/pinia-subscribe';
import { piniaGlobalStore } from './plugins/pinia-global-store';
import elementPlusPlugin from '@/plugins/element-plus';
import opKitPlugin from '@/plugins/op-kit';
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';

import { router } from '@/router/vue-router';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaSubscribe).use(piniaGlobalStore);

app.use(ElementPlus);
app.use(pinia).use(router).use(elementPlusPlugin).use(opKitPlugin);

app.mount('#app');
