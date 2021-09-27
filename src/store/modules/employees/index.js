import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      loading: false,
      error: null,
      employeeList: null,
      employeeInfo: null,
      settleSuccess: null,
    };
  },
  mutations,
  actions,
  getters,
};
