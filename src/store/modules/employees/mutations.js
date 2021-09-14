import TYPES from "./types";

export default {
  [TYPES.EMPLOYEE_LIST_LOADING](state) {
    state.loading = true;
    state.employeeList = null;
    state.error = null;
  },
  [TYPES.EMPLOYEE_LIST_SUCCESS](state, payload) {
    state.loading = false;
    state.employeeList = payload;
    state.error = null;
  },
  [TYPES.EMPLOYEE_LIST_ERROR](state, payload) {
    state.loading = false;
    state.employeeList = null;
    state.error = payload;
  },
};
