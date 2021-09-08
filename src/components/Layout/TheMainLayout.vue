<template>
  <div>
    <the-header></the-header>
    <div id="main-container">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
export default {
  components: { TheHeader }
};
</script>

<style scoped>
#main-container {
  height: calc(100vh - 85px);
  overflow: auto;
  position: relative;
  margin-top: 85px;
  background-color: #f5f6f7;
}

#main-container::-webkit-scrollbar-track {
  background: #c5dafe;
}

#main-container::-webkit-scrollbar-thumb {
  background: #3e83fb;
}

#main-container::-webkit-scrollbar-thumb:hover {
  background: #c5dafe;
}

#main-container::-webkit-scrollbar {
  width: 8px;
}
</style>
