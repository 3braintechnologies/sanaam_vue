import TYPES from "./types";

export default {
  [TYPES.PAYMENT_LIST_LOADING](state) {
    state.loading = true;
    state.paymentList = null;
    state.error = null;
  },
  [TYPES.PAYMENT_LIST_SUCCESS](state, payload) {
    state.loading = false;
    state.paymentList = payload;
    state.error = null;
  },
  [TYPES.PAYMENT_LIST_ERROR](state, payload) {
    state.loading = false;
    state.paymentList = null;
    state.error = payload;
  },
};
