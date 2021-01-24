export default {
  state: {
    modalVisible: false,
    modalComponent: null,
  },
  actions: {},
  mutations: {
    SET_SHOW_MODAL(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
    },
  },
}