import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/index';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import {Window, Tag} from '@/custom';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

declare let window: Window;
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0];
};
window.createTag = (name: string) => {
  const message = tagListModel.create(name); // 知识点 2 // 最小知识原则
  if (message === 'duplicated') {
    window.alert('标签名重复了');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};
// object: Exclude<Tag, 'id'> 表示 Tag 类型里除了 id 属性以外的值
// window.updateTag = (id: string, object: Exclude<Tag, 'id'>) => {};
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
};
new Vue({
  router: router,
  store,
  render: h => h(App)
}).$mount('#app');
