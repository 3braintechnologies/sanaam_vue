import coreApi from "../../../lib/coreApi";

export default {
  paymentList: (data) => {
    let qp = "";
    for (var key in data) {
      qp = qp + `&${key}=${data[key]}`;
    }
    if (qp && qp.length && qp.length > 1) qp = qp.replace(qp.charAt(0), "?");

    let url = `/backoffice/payments${qp}`;
    let result = coreApi.GET(url);
    return result;
  },
};
