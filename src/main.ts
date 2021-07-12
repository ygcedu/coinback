import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import {Window} from '@/custom';
import Global = WebAssembly.Global;

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

declare let window: Window;
window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const message = tagListModel.create(name); // 知识点 2 // 最小知识原则
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};

new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
