<template>
  <div id="company-dashboard">
    <the-sidebar
      baseURL="/company/dashboard"
      :activeTab="activeTab"
      :tabs="tabs"
    ></the-sidebar>
    <div class="page-content-container">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>

<script>
import TheSidebar from "../../components/Layout/TheSidebar.vue";
import Employees from "./Employees.vue";
export default {
  props: ["activeTab"],
  components: { TheSidebar, Employees },
  data() {
    return {
      tabs: [
        { name: "Employees", icon: "Employees_Icon.svg", isActive: true },
        { name: "Leaves", icon: "Daily Attendance Icon.svg", isActive: false },
        { name: "Requests", icon: "Requests Icon.svg", isActive: false },
        {
          name: "Statistics",
          icon: "Statistics Icon.svg",
          isActive: false,
          comingSoon: true
        }
      ]
    };
  }
};
</script>

<style scoped>
#company-dashboard {
  display: flex;
}
#company-dashboard .page-content-container {
  margin-left: 230px;
  background-color: #ffffff;
  width: calc(100% - 85px);
  min-height: calc(100vh - 85px);
  padding: 45px 90px;
}
</style>
