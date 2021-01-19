import Vue from 'vue';
import Vuex from 'vuex';
import day from './modules/day';
import task from './modules/task';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    day,
    task,
  }
})
