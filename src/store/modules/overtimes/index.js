import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      error: null,
      overtimeList: null,
    };
  },
  mutations,
  actions,
  getters,
};
