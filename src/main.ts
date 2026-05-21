import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import i18n from './locales/index';

// Tailwind CSS + Figma デザイントークン
import './assets/main.css';

// TODO: FontAwesome を使用する場合は package.json に追加してインポートする
// import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
