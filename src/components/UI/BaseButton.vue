<template>
  <button
    class="btn"
    :class="{
      primaryBtn: stylevariant === 'primary',
      secondary1Btn: stylevariant === 'secondary1',
      secondary2Btn: stylevariant === 'secondary2',
      secondary3Btn: stylevariant === 'secondary3',
      dangerBtn: stylevariant === 'danger'
    }"
    :type="type"
    @click="onClick"
    :style="style"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type", "onClick", "stylevariant"],
  computed: {
    style() {
      return `border-radius:21px;
      text-transform: capitalize;
      padding: 6px 16px; 
      width:-webkit-fill-available;cursor:pointer;`;
    }
  }
};
</script>

<style scoped>
.primaryBtn {
  background-color: #3e83fb;
  color: #ffffff;
  border: 1px solid #3e83fb;
}
.primaryBtn:hover {
  background-color: #ecf3ff;
  color: #150e4a;
}
.primaryBtn:disabled {
  opacity: 0.3;
}

.secondary1Btn {
  background-color: #150e4a;
  color: #79f59f;
  border: 1px solid #150e4a;
}
.secondary1Btn:hover {
  background-color: #79f59f;
  color: #150e4a;
}
.secondary1Btn:disabled {
  opacity: 0.3;
}

.secondary2Btn {
  background-color: #ffffff;
  color: #3e83fb;
  border: 1px solid #3e83fb;
}
.secondary2Btn:hover {
  background-color: #ecf3ff;
  color: #3e83fb;
}
.secondary2Btn:disabled {
  opacity: 0.3;
}

.secondary3Btn {
  background-color: #78f49e;
  color: #150e4a;
  border: 1px solid #78f49e;
}
.secondary3Btn:hover {
  background-color: #150e4a;
  color: #78f49e;
}
.secondary3Btn:disabled {
  opacity: 0.3;
}

.dangerBtn {
  background-color: #b00020;
  color: #ffffff;
  border: 1px solid #b00020;
}
.dangerBtn:hover {
  background-color: #ecf3ff;
  color: #b00020;
}
.dangerBtn:disabled {
  opacity: 0.3;
}
</style>
