import axios from 'axios';

export default{
  state: {
    weekDays: [],
  },
  actions: {
    GET_WEEKDAYS({commit}) {
      return axios('/api/days', {
        method: 'GET',
      })
        .then(response => {
          commit('SET_WEEKDAYS', response.data);
          return response.data;
        })
        .catch(error => {
          console.log('ошибка ' + error)
        });
    }
  },
  mutations: {
    SET_WEEKDAYS(state, weekDays) {
      state.weekDays = weekDays;
    },
  },
  getters: {
    WEEKDAYS(state) {
      return state.weekDays
    },
  },
};
