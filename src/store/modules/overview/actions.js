import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";

export default {
  async getOverview(context, payload) {
    context.commit(TYPES.OVERVIEW_LOADING);
    try {
      let res = await API.overview(payload);
      if (res && res.data) {
        context.commit(TYPES.OVERVIEW_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.OVERVIEW_ERROR, res.message);
      } else {
        context.commit(TYPES.OVERVIEW_ERROR, Constants.ERROR.INTERNAL_SERVER);
      }
    } catch (error) {
      context.commit(TYPES.OVERVIEW_ERROR, {
        payload: error.message,
      });
    }
  },
};
