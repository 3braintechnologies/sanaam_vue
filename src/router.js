import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/auth/Login.vue";
import TheMainLayout from "./components/Layout/TheMainLayout.vue";
import BackOfficeDashboard from "./pages/backOffice/Dashboard.vue";
import CompanyDashboard from "./pages/company/Dashboard.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/backoffice",
      component: TheMainLayout,
      children: [
        {
          path: "dashboard/:activeTab",
          component: BackOfficeDashboard,
          props: true,
        },
      ],
    },
    {
      path: "/company",
      component: TheMainLayout,
      children: [
        {
          path: "dashboard/:activeTab",
          component: CompanyDashboard,
          props: true,
        },
      ],
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
