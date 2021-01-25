export default {
  state: {
    modalVisible: false,
    modalComponent: null,
  },
  actions: {
    TOGGLE_SHOW_MODAL({commit}, commentName) {
      commit('SET_SHOW_MODAL', commentName);
    }
  },
  mutations: {
    SET_SHOW_MODAL(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
    },
  },
}