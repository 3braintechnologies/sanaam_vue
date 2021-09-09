import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";

export default {
  async getCountriesEnumerates(context) {
    context.commit(TYPES.COUNTRIES_ENUMERATES_LOADING);
    try {
      let res = await API.countriesEnumerates();
      if (res && res.data) {
        context.commit(TYPES.COUNTRIES_ENUMERATES_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.COUNTRIES_ENUMERATES_ERROR, res.message);
      } else {
        context.commit(
          TYPES.COUNTRIES_ENUMERATES_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.COUNTRIES_ENUMERATES_ERROR, {
        payload: error.message,
      });
    }
  },
  async getCurrenciesEnumerates(context) {
    context.commit(TYPES.CURRENCIES_ENUMERATES_LOADING);
    try {
      let res = await API.currenciesEnumerates();
      if (res && res.data) {
        context.commit(TYPES.CURRENCIES_ENUMERATES_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.CURRENCIES_ENUMERATES_ERROR, res.message);
      } else {
        context.commit(
          TYPES.CURRENCIES_ENUMERATES_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.CURRENCIES_ENUMERATES_ERROR, {
        payload: error.message,
      });
    }
  },
  async getTimezonesEnumerates(context) {
    context.commit(TYPES.TIMEZONES_ENUMERATES_LOADING);
    try {
      let res = await API.timezonesEnumerates();
      if (res && res.data) {
        context.commit(TYPES.TIMEZONES_ENUMERATES_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.TIMEZONES_ENUMERATES_ERROR, res.message);
      } else {
        context.commit(
          TYPES.TIMEZONES_ENUMERATES_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.TIMEZONES_ENUMERATES_ERROR, {
        payload: error.message,
      });
    }
  },
};
