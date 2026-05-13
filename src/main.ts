import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

// Tailwind CSS + Figma デザイントークン
import './assets/main.css';

// TODO: FontAwesome を使用する場合は package.json に追加してインポートする
// import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
