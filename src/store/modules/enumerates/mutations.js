import TYPES from "./types";

export default {
  [TYPES.COUNTRIES_ENUMERATES_LOADING](state) {
    state.loading = true;
    state.countriesEnumerates = null;
    state.error = null;
  },
  [TYPES.COUNTRIES_ENUMERATES_SUCCESS](state, payload) {
    state.loading = false;
    state.countriesEnumerates = payload;
    state.error = null;
  },
  [TYPES.COUNTRIES_ENUMERATES_ERROR](state, payload) {
    state.loading = false;
    state.countriesEnumerates = null;
    state.error = payload;
  },
  [TYPES.CURRENCIES_ENUMERATES_LOADING](state) {
    state.loading = true;
    state.currenciesEnumerates = null;
    state.error = null;
  },
  [TYPES.CURRENCIES_ENUMERATES_SUCCESS](state, payload) {
    state.loading = false;
    state.currenciesEnumerates = payload;
    state.error = null;
  },
  [TYPES.CURRENCIES_ENUMERATES_ERROR](state, payload) {
    state.loading = false;
    state.currenciesEnumerates = null;
    state.error = payload;
  },
  [TYPES.TIMEZONES_ENUMERATES_LOADING](state) {
    state.loading = true;
    state.timezonesEnumerates = null;
    state.error = null;
  },
  [TYPES.TIMEZONES_ENUMERATES_SUCCESS](state, payload) {
    state.loading = false;
    state.timezonesEnumerates = payload;
    state.error = null;
  },
  [TYPES.TIMEZONES_ENUMERATES_ERROR](state, payload) {
    state.loading = false;
    state.timezonesEnumerates = null;
    state.error = payload;
  },
};
