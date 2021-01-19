import axios from 'axios';

export default {
  state: {
    dayTasks:[],
  },
  actions: {
    GET_DAY_TASKS({commit}, dayId) {
      return axios('/api/tasks?dayId=' + dayId, {
        method: 'GET',
      })
        .then(response => {
          commit('SET_DAY_TASKS', response.data);

          return response.data;
        })
        .catch(error => {
          console.log('ошибка ' + error)
        });
    }
  },
  mutations: {
    SET_DAY_TASKS(state, dayTasks) {
      state.dayTasks = dayTasks.sort((a, b) => {
        if (a.time < b.time) {
          return -1;
        }
        if (a.time > b.time) {
          return 1;
        }
        return 0;
      });
    },

    CHECK_IS_PASSED(state, isPassed) {
      state.dayTasks.forEach(task => {
        task.isPassed = isPassed(task.time)
      });
    }
  },
  getters: {
    DAY_TASKS(state) {
      return state.dayTasks;
    },
  },
}