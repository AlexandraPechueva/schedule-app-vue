import axios from 'axios';

export default{
  state: {
    weekDays: [],
    activatedDay: 0,
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
    },

    GET_ACTIVATED_DAY({commit}, dayId) {
      commit('SET_ACTIVATED_DAY', dayId)
    }

  },
  mutations: {
    SET_WEEKDAYS(state, weekDays) {
      state.weekDays = weekDays;
    },

    SET_ACTIVATED_DAY(state, activatedDay) {
      state.activatedDay = activatedDay;
    }
  },
  getters: {
    WEEKDAYS(state) {
      return state.weekDays;
    },

    ACTIVATED_DAY(state) {
      return state.activatedDay;
    }
  },
};
