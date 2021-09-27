import TYPES from "./types";

export default {
  [TYPES.PAYMENT_LIST_LOADING](state) {
    state.loading = true;
    state.paymentList = null;
    state.paymentInfo = null;
    state.settleSuccess = null;
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
  [TYPES.PAYMENT_INFO_LOADING](state) {
    state.loading = true;
    state.paymentInfo = null;
    state.error = null;
  },
  [TYPES.PAYMENT_INFO_SUCCESS](state, payload) {
    state.loading = false;
    state.paymentInfo = payload;
    state.error = null;
  },
  [TYPES.PAYMENT_INFO_ERROR](state, payload) {
    state.loading = false;
    state.paymentInfo = null;
    state.error = payload;
  },
  [TYPES.SETTLE_PAYMENT_LOADING](state) {
    state.loading = true;
    state.settleSuccess = null;
    state.error = null;
  },
  [TYPES.SETTLE_PAYMENT_SUCCESS](state, payload) {
    state.loading = false;
    state.settleSuccess = payload;
    state.error = null;
  },
  [TYPES.SETTLE_PAYMENT_ERROR](state, payload) {
    state.loading = false;
    state.settleSuccess = null;
    state.error = payload;
  },
};
