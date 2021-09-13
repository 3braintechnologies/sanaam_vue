import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";

export default {
  async getOvertimeList(context, payload) {
    context.commit(TYPES.OVERTIME_LIST_LOADING);
    try {
      let res = await API.overtimeList(payload);
      if (res && res.data) {
        context.commit(TYPES.OVERTIME_LIST_SUCCESS, res);
      } else if (res && res.message) {
        context.commit(TYPES.OVERTIME_LIST_ERROR, res.message);
      } else {
        context.commit(
          TYPES.OVERTIME_LIST_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.OVERTIME_LIST_ERROR, {
        payload: error.message,
      });
    }
  },
};
