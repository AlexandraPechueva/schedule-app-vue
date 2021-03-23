import axios from 'axios';

export default {
  state: {
    dayTasks:[],
    currentTasksState: 'Все',
  },
  actions: {
    GET_DAY_TASKS({commit}, dayId) {
      return axios.get('/api/tasks?dayId=' + dayId)
        .then(response => {
          commit('SET_DAY_TASKS', response.data);
          return response.data;
        })
        .catch(error => {
          console.log('ошибка ' + error)
        });
    },

    ADD_DAY_TASK({commit, state}, newTask) {
      commit('ADD_DAY_TASK', newTask);
      commit('SET_DAY_TASKS', state.dayTasks);
      return axios.post('/api/tasks/', newTask)
    },

    DELETE_DAY_TASK({commit},taskId) {
      return axios.delete('/api/tasks/' + taskId)
        .then (response => {
          commit('DELETE_DAY_TASK', taskId);
          return response.data;
        })
    },
    CHANGE_DAY_TASK({commit, state}, {taskId, changedTask}) {
      return axios.put('/api/tasks/' + taskId, changedTask)
        .then (response => {
          commit('CHANGE_DAY_TASK', response.data);
          commit('SET_DAY_TASKS', state.dayTasks);
          return response.data;
        })
    },
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
    },

    SET_CURRENT_TASKS_STATE(state, value) {
      state.currentTasksState = value;
    },

    DELETE_DAY_TASK(state, taskId) {
      state.dayTasks = state.dayTasks.filter(task => task.id !== taskId)
    },

    ADD_DAY_TASK(state, newTask) {
      state.dayTasks.push(newTask);
    },

    CHANGE_DAY_TASK(state, changedTask) {
      const index = state.dayTasks.findIndex(task => task.id === changedTask.id);

      if (index > -1) {
        state.dayTasks[index] = changedTask;
      }
    },
  },
  getters: {
    DAY_TASKS(state) {
      return state.dayTasks;
    },

    CURRENT_TASKS_STATE(state) {
      return state.currentTasksState;
    },

    FILTERED_DAY_TASKS(state) {
      if(state.currentTasksState === 'Активные') {
        return state.dayTasks.filter(task => !task.isPassed)
      }
      else if(state.currentTasksState === 'Прошедшие') {
        return state.dayTasks.filter(task => task.isPassed)
      }
      else {
        return state.dayTasks;
       }
    }
  },
}
