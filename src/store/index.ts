import Vue from 'vue';
import Vuex from 'vuex';
import {RecordItem, RootState} from '@/custom';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';

Vue.use(Vuex);// 把 store 绑到 Vue.prototype 上，在Vue初始化的时候传，Vue.prototype.$store = store，详情参见 main.ts

// 用泛型指定类型
// const store = new Vuex.Store<RootState>({
const store = new Vuex.Store({
  state: {// data
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {// methods
    setCurrentTag(state, id) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        // Vue.prototype.$router.back();// 此法不行
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    fetchRecords(state) {
      // as 强行指定返回数据类型为 RecordItem[]
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      // 如果发现没有标签，就自动创建 '衣'、'食'、'住'、'行' 四个默认标签
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();// ISO 8601 格式的时间字符串
      state.recordList.push(record2);
      store.commit('saveRecord');
      // recordStore.saveRecord();
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string) {
      // this.data = [{id:'1', name:'1'}, {id:'2', name:'2'}]
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功');
      return 'success';
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  }
});

export default store;

