export default {
  state: {
    modalVisible: false,
    modalComponent: null,
    isValid: false,
  },
  actions: {
    TOGGLE_SHOW_MODAL({commit}, commentName) {
      commit('SET_SHOW_MODAL', commentName);
    },
    GET_IS_VALID({commit}, isInvalid) {
      commit('SET_IS_VALID', isInvalid);
    }
  },
  mutations: {
    SET_SHOW_MODAL(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
    },
    SET_IS_VALID(state, isValid) {
      state.isValid = isValid;
    }
  },
}
