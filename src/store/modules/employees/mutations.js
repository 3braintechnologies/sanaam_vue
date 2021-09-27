import TYPES from "./types";

export default {
  [TYPES.EMPLOYEE_LIST_LOADING](state) {
    state.loading = true;
    state.employeeList = null;
    state.employeeInfo = null;
    state.settleSuccess = null;
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
  [TYPES.EMPLOYEE_INFO_LOADING](state) {
    state.loading = true;
    state.employeeInfo = null;
    state.error = null;
  },
  [TYPES.EMPLOYEE_INFO_SUCCESS](state, payload) {
    state.loading = false;
    state.employeeInfo = payload;
    state.error = null;
  },
  [TYPES.EMPLOYEE_INFO_ERROR](state, payload) {
    state.loading = false;
    state.employeeInfo = null;
    state.error = payload;
  },
  [TYPES.SETTLE_SALARY_LOADING](state) {
    state.loading = true;
    state.settleSuccess = null;
    state.error = null;
  },
  [TYPES.SETTLE_SALARY_SUCCESS](state, payload) {
    state.loading = false;
    state.settleSuccess = payload;
    state.error = null;
  },
  [TYPES.SETTLE_SALARY_ERROR](state, payload) {
    state.loading = false;
    state.settleSuccess = null;
    state.error = payload;
  },
};
