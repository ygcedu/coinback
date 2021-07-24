import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');

// 为了完全显示底部导航栏，将手机浏览器滚动到页面最底部
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};
