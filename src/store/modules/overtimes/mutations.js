import TYPES from "./types";

export default {
  [TYPES.OVERTIME_LIST_LOADING](state) {
    state.loading = true;
    state.overtimeList = null;
    state.error = null;
  },
  [TYPES.OVERTIME_LIST_SUCCESS](state, payload) {
    state.loading = false;
    state.overtimeList = payload;
    state.error = null;
  },
  [TYPES.OVERTIME_LIST_ERROR](state, payload) {
    state.loading = false;
    state.overtimeList = null;
    state.error = payload;
  },
};
