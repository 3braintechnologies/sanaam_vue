import TYPES from "./types";

export default {
  [TYPES.SIGNING_LOADING](state) {
    state.loading = true;
    state.success = null;
    state.error = null;
  },
  [TYPES.SIGNING_SUCCESS](state, payload) {
    state.loading = false;
    state.success = payload;
    state.error = null;
  },
  [TYPES.SIGNING_ERROR](state, payload) {
    state.loading = false;
    state.success = null;
    state.error = payload;
  },
};
