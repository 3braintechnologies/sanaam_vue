import coreApi from "../../../lib/coreApi";

export default {
  paymentList: (data) => {
    let qp = "";
    for (var key in data) {
      qp = qp + `&${key}=${data[key]}`;
    }
    if (qp && qp.length && qp.length > 1) qp = qp.replace(qp.charAt(0), "?");

    let url = `${
      window.location.pathname.includes("backoffice")
        ? "/backoffice"
        : window.location.pathname.includes("company")
        ? "/admin"
        : ""
    }/payments${qp}`;
    let result = coreApi.GET(url);
    return result;
  },
  paymentInfo: (payment_id) => {
    let url = `${
      window.location.pathname.includes("backoffice")
        ? "/backoffice"
        : window.location.pathname.includes("company")
        ? "/admin"
        : ""
    }/payments/${payment_id}`;
    let result = coreApi.GET(url);
    return result;
  },
  settlePayment: (data) => {
    let url = `/backoffice/payments/${data.payment_id}/settle`;
    let result = coreApi.PATCH(url, data.payload);
    return result;
  },
};
