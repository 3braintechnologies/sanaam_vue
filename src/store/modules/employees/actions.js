import API from "./api";
import TYPES from "./types";
import { Constants } from "../../../lib/constant";

export default {
  async getEmployeeList(context, payload) {
    context.commit(TYPES.EMPLOYEE_LIST_LOADING);
    try {
      let res = await API.employeeList(payload);
      if (res && res.data) {
        context.commit(TYPES.EMPLOYEE_LIST_SUCCESS, res);
      } else if (res && res.message) {
        context.commit(TYPES.EMPLOYEE_LIST_ERROR, res.message);
      } else {
        context.commit(
          TYPES.EMPLOYEE_LIST_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.EMPLOYEE_LIST_ERROR, {
        payload: error.message,
      });
    }
  },
  async employeeInfo(context, payload) {
    context.commit(TYPES.EMPLOYEE_INFO_LOADING);
    try {
      let res = await API.employeeInfo(payload);
      if (res && res.data) {
        context.commit(TYPES.EMPLOYEE_INFO_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.EMPLOYEE_INFO_ERROR, res.message);
      } else {
        context.commit(
          TYPES.EMPLOYEE_INFO_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.EMPLOYEE_INFO_ERROR, {
        payload: error.message,
      });
    }
  },
  async settleSalary(context, payload) {
    context.commit(TYPES.SETTLE_SALARY_LOADING);
    try {
      let res = await API.settleSalary(payload);
      if (res && res.data) {
        context.commit(TYPES.SETTLE_SALARY_SUCCESS, res.data);
      } else if (res && res.message) {
        context.commit(TYPES.SETTLE_SALARY_ERROR, res.message);
      } else {
        context.commit(
          TYPES.SETTLE_SALARY_ERROR,
          Constants.ERROR.INTERNAL_SERVER
        );
      }
    } catch (error) {
      context.commit(TYPES.SETTLE_SALARY_ERROR, {
        payload: error.message,
      });
    }
  },
};
