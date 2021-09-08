import coreApi from "../../../lib/coreApi";

export default {
  Login: (data) => {
    let url = `/auth/login`;
    let result = coreApi.POST(url, data);
    return result;
  },
};
