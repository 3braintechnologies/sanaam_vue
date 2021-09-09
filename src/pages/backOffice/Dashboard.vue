<template>
  <div id="backoffice-dashboard">
    <the-sidebar
      baseURL="/backoffice/dashboard"
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
import Overview from "./Overview.vue";
import Transactions from "./Transactions.vue";
import Companies from "./Companies.vue";
export default {
  props: ["activeTab"],
  components: { TheSidebar, Overview, Transactions, Companies },
  data() {
    return {
      tabs: [
        { name: "Overview", icon: "Overview Icon.svg", isActive: true },
        { name: "Transactions", icon: "Transaction Icon.svg", isActive: true },
        { name: "Companies", icon: "Company Icon.svg", isActive: true },
        {
          name: "Reports",
          icon: "Report Icon.svg",
          isActive: false,
          comingSoon: true
        }
      ]
    };
  }
};
</script>

<style scoped>
#backoffice-dashboard {
  display: flex;
}
#backoffice-dashboard .page-content-container {
  margin-left: 230px;
  background-color: #ffffff;
  width: calc(100% - 85px);
  min-height: calc(100vh - 85px);
  padding: 45px 90px;
}
</style>
