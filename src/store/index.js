import { createStore } from "vuex";

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    setUserData(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  getters: {
    user: (state) => state.user,
  },
});
