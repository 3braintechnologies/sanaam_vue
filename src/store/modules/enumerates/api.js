import coreApi from "../../../lib/coreApi";

export default {
  countriesEnumerates: () => {
    let url = `/enumerates/countries`;
    let result = coreApi.GET(url);
    return result;
  },
  currenciesEnumerates: () => {
    let url = `/enumerates/currencies`;
    let result = coreApi.GET(url);
    return result;
  },
  timezonesEnumerates: () => {
    let url = `/enumerates/timezones`;
    let result = coreApi.GET(url);
    return result;
  },
};
