import Vue from 'vue';
import Vuex from 'vuex';
import {RecordItem} from '@/custom';
import clone from '@/lib/clone';

Vue.use(Vuex);// 把 store 绑到 Vue.prototype 上，在Vue初始化的时候传，Vue.prototype.$store = store，详情参见 main.ts

const store = new Vuex.Store({
  state: {// data
    recordList: [] as RecordItem[]
  },
  mutations: {// methods
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList.push(record2);
      // recordStore.saveRecord();
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
  }
});

export default store;

