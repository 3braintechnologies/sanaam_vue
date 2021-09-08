<template>
  <div :id="id" style="height: 250px; width: 250px;"></div>
</template>

<script>
var CanvasJS = require("../../lib/canvasjs.min");
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

export default {
  props: ["id", "options"],
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.chart = new CanvasJS.Chart(this.id, this.options);
    this.chart.render();
  }
};
</script>
