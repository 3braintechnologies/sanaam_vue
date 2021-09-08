<template>
  <div id="main-sidebar">
    <div id="sidebar-list">
      <div
        id="sidebar-item"
        v-for="tab in tabs"
        :class="{
          selectedTab: activeTab === tab.name,
          disabledTab: !tab.isActive
        }"
        :key="tab.name"
        @click="changeLink(tab)"
      >
        <img
          :src="`/images/${tab.icon}`"
          :alt="tab.icon"
          :style="getIconStyle(tab)"
        />
        <div id="sidebar-item-text">
          {{ tab.name }}
          <span class="soonText" v-if="tab.comingSoon">Soon</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["baseURL", "activeTab", "tabs"],
  methods: {
    getIconStyle(tab) {
      return `filter: ${
        this.activeTab === tab.name ? "brightness(0) invert(1)" : ""
      };
      height:25px;
      width: 25px;
      margin-right:10px;`;
    },
    changeLink(tab) {
      if (tab.isActive) this.$router.push(`${this.baseURL}/${tab.name}`);
    }
  }
};
</script>

<style scoped>
#main-sidebar {
  width: 230px;
  background-color: #ecf3ff;
  height: calc(100vh - 145px);
  padding: 30px 0px;
  position: fixed;
}
#sidebar-list {
  padding-top: 10px;
  padding-bottom: 10px;
}
#sidebar-item {
  display: flex;
  align-items: center;
  padding-left: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #3e83fa;
  cursor: pointer;
}
#main-sidebar .disabledTab {
  opacity: 0.5;
  cursor: not-allowed !important;
}
#sidebar-item-text {
  font-family: MARKPROMEDIUM;
  font-size: 16px;
  margin-top: 4px;
  margin-bottom: 4px;
  position: relative;
}
#main-sidebar .selectedTab {
  background-color: #3e83fa !important;
  color: #ffffff !important;
}
#main-sidebar .soonText {
  text-transform: uppercase;
  position: absolute;
  background-color: #150e4a;
  color: #78f49e;
  padding: 1px 2px;
  font-size: 7px;
  border-radius: 2px;
  font-family: MARKPROBOLD;
  opacity: 1;
}
</style>
