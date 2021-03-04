import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@/assets/styles/scss/index.scss';
import vueMaterial from './assets/styles/vueMaterial';
import Plugin from './assets/plugins';

Plugin(Vue);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vueMaterial,
  render: h => h(App)
}).$mount('#app');
