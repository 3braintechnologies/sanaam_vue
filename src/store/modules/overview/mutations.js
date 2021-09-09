import TYPES from "./types";

export default {
  [TYPES.OVERVIEW_LOADING](state) {
    state.loading = true;
    state.overview = null;
    state.error = null;
  },
  [TYPES.OVERVIEW_SUCCESS](state, payload) {
    state.loading = false;
    state.overview = payload;
    state.error = null;
  },
  [TYPES.OVERVIEW_ERROR](state, payload) {
    state.loading = false;
    state.overview = null;
    state.error = payload;
  },
};
