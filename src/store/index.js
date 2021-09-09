import { createStore } from "vuex";

import authModule from "./modules/auth/index";
import enumeratesModule from "./modules/enumerates/index";
import companyModule from "./modules/company/index";
import overviewModule from "./modules/overview/index";

const store = createStore({
  modules: {
    auth: authModule,
    enumerates: enumeratesModule,
    company: companyModule,
    overview: overviewModule,
  },
});

export default store;
