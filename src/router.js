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
    { path: "/login", component: Login, meta: { requiresUnauth: true } },
    {
      path: "/backoffice",
      component: TheMainLayout,
      meta: { requiresAuth: true, isSuper: true },
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
      meta: { requiresAuth: true, isAdmin: true },
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

router.beforeEach(function(to, _, next) {
  if (
    to.meta.requiresAuth &&
    ((to.meta.isSuper && !JSON.parse(localStorage.getItem("user"))?.is_super) ||
      (to.meta.isAdmin && !JSON.parse(localStorage.getItem("user"))?.is_admin))
  ) {
    localStorage.clear();
    next("/login");
  } else if (
    to.meta.requiresUnauth &&
    (JSON.parse(localStorage.getItem("user"))?.is_super ||
      JSON.parse(localStorage.getItem("user"))?.is_admin)
  ) {
    if (JSON.parse(localStorage.getItem("user"))?.is_super)
      next("/backoffice/dashboard/Overview");
    if (JSON.parse(localStorage.getItem("user"))?.is_admin)
      next("/company/dashboard/Employees");
  } else {
    next();
  }
});

export default router;
