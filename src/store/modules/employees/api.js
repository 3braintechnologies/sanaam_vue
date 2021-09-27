import coreApi from "../../../lib/coreApi";

export default {
  employeeList: (data) => {
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
    }/employees${qp}`;
    let result = coreApi.GET(url);
    return result;
  },
  employeeInfo: (employee_id) => {
    let url = `${
      window.location.pathname.includes("backoffice")
        ? "/backoffice"
        : window.location.pathname.includes("company")
        ? "/admin"
        : ""
    }/employees/${employee_id}`;
    let result = coreApi.GET(url);
    return result;
  },
  settleSalary: (employee_id) => {
    let url = `/backoffice/employees/${employee_id}/settle`;
    let result = coreApi.POST(url);
    return result;
  },
};
