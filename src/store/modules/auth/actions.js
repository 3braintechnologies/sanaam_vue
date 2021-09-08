import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";
import router from "../../../router";

export default {
  async login(context, payload) {
    context.commit(TYPES.SIGNING_LOADING);
    try {
      let res = await API.Login(payload);
      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        context.commit(TYPES.SIGNING_SUCCESS, res.data);
        if (payload.redirectURI && payload.redirectURI.includes("payments")) {
          if (res && res.data && res.data.user && res.data.user.is_super) {
            router.replace(payload.redirectURI);
          } else {
            localStorage.clear();
            context.commit(TYPES.SIGNING_ERROR, "Permission denied.");
          }
        } else if (res && res.data && res.data.user && res.data.user.is_super) {
          router.replace("/backoffice/dashboard/Overview");
        } else if (res && res.data && res.data.user && res.data.user.is_admin) {
          router.replace("/company/dashboard/Employees");
        } else {
          localStorage.clear();
          context.commit(TYPES.SIGNING_ERROR, Constants.ERROR.PERMISSION_ERROR);
        }
      } else if (res && res.message) {
        context.commit(TYPES.SIGNING_ERROR, res.message);
      } else {
        context.commit(TYPES.SIGNING_ERROR, Constants.ERROR.INTERNAL_SERVER);
      }
    } catch (error) {
      context.commit(TYPES.SIGNING_ERROR, { payload: error.message });
    }
  },
};
