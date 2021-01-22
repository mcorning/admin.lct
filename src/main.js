import config from '@/config.json';

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);

let url = process.env.NODE_ENV == 'development' ? config.ioServerUrl : config.ngrokUrlUbuntu;
const key = 'query';
// localStorage.removeItem(key);

const options = JSON.parse(localStorage.getItem(key));

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: url,
    options: options,
    autoConnect: false
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
