import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import './assets/icon-font.css';
import './assets/font-awesome.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
