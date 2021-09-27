import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";
import BaseSelect from "./components/UI/BaseSelect.vue";
import BaseTable from "./components/UI/BaseTable.vue";
import BasePagination from "./components/UI/BasePagination.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("base-input", BaseInput);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);
app.component("base-select", BaseSelect);
app.component("base-table", BaseTable);
app.component("base-pagination", BasePagination);

app.mount("#app");
