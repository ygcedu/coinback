import Vue from 'vue';
import Vuex from 'vuex';
import {RecordItem, Tag} from '@/custom';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';

Vue.use(Vuex);// 把 store 绑到 Vue.prototype 上，在Vue初始化的时候传，Vue.prototype.$store = store，详情参见 main.ts

const store = new Vuex.Store({
  state: {// data
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: {// methods
    fetchRecords(state) {
      // as 强行指定返回数据类型为 RecordItem[]
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
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
    }
  }
});

export default store;

