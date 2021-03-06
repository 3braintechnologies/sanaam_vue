import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";

export default {
  async getCompanyList(context, payload) {
    context.commit(TYPES.COMPANY_LIST_LOADING);
    try {
      let res = await API.companyList(payload);
      if (res && res.data) {
        context.commit(TYPES.COMPANY_LIST_SUCCESS, res);
      } else if (res && res.message) {
        context.commit(TYPES.COMPANY_LIST_ERROR, res.message);
      } else {
        context.commit(
          TYPES.COMPANY_LIST_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.COMPANY_LIST_ERROR, {
        payload: error.message,
      });
    }
  },
  async getCompanyInfo(context, payload) {
    context.commit(TYPES.COMPANY_INFO_LOADING);
    try {
      let res = await API.getCompanyInfo(payload);
      if (res && res.data) {
        context.commit(TYPES.COMPANY_INFO_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.COMPANY_INFO_ERROR, res.message);
      } else {
        context.commit(
          TYPES.COMPANY_INFO_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.COMPANY_INFO_ERROR, {
        payload: error.message,
      });
    }
  },
};
