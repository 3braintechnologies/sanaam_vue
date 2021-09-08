<template>
  <div id="company-dashboard">
    Company Dahboard
    <component :is="activeTab"></component>
  </div>
</template>

<script>
import Employees from "./Employees.vue";
export default {
  props: ["activeTab"],
  components: { Employees }
};
</script>

<style scoped>
#company-dashboard {
  margin-top: 90px;
}
</style>
