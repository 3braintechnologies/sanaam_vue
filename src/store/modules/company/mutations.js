import TYPES from "./types";

export default {
  [TYPES.COMPANY_LIST_LOADING](state) {
    state.loading = true;
    state.companyList = null;
    state.error = null;
  },
  [TYPES.COMPANY_LIST_SUCCESS](state, payload) {
    state.loading = false;
    state.companyList = payload;
    state.error = null;
  },
  [TYPES.COMPANY_LIST_ERROR](state, payload) {
    state.loading = false;
    state.companyList = null;
    state.error = payload;
  },
};
