import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {// data
    count: 0,
    n: 0,
  },
  mutations: {// methods
    increment(state, n: number) {
      state.count += n;
    }
  },
  actions: {},
  modules: {}
});

console.log(store.state.count);// 0
store.commit('increment', 10);// +10
console.log(store.state.count);// 1

export default store;

