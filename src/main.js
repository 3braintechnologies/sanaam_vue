import { createApp } from "vue";
import router from "./router.js";
import store from "./store/index.js";
import App from "./App.vue";
import BaseInput from "./components/UI/BaseInput.vue";
import BaseButton from "./components/UI/BaseButton.vue";
import BaseSpinner from "./components/UI/BaseSpinner.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("base-input", BaseInput);
app.component("base-button", BaseButton);
app.component("base-spinner", BaseSpinner);

app.mount("#app");
