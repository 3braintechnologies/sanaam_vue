<template>
  <div class="input-root" :style="getRootStyle">
    <div class="form-label labelText" v-if="label">
      {{ label }}
    </div>
    <input
      class="form-control"
      :class="{ invalidInput: isValid ? true : false }"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      v-model.trim="inputfield"
      :style="style"
    />
    <div class="helperText" v-if="helperText">
      {{ helperText }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ["change-value"],
  props: [
    "type",
    "label",
    "placeholder",
    "isValid",
    "helperText",
    "field",
    "value",
    "style",
    "removeDefaultMargin"
  ],
  data() {
    return { inputfield: this.value };
  },
  watch: {
    value: function(val) {
      this.selectfield = val;
    },
    inputfield() {
      this.$emit("change-value", this.inputfield, this.field);
    }
  },
  computed: {
    getRootStyle() {
      return `margin-bottom: ${this.removeDefaultMargin ? "0px" : "20px"};`;
    }
  }
};
</script>

<style scoped>
.labelText {
  font-size: 16px;
  color: #150e4a;
  margin-bottom: 5px;
  font-family: MARKPROMEDIUM;
}
.helperText {
  color: #f44336;
  margin: 0;
  font-size: 0.75rem;
  margin-top: 3px;
  text-align: left;
  font-family: MARKPRO;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
}
.invalidInput {
  border-color: red !important;
  background-color: white !important;
}
input {
  padding: 10px;
  font-size: 14px;
  font-family: MARKPRO;
  width: -webkit-fill-available;
  background-color: #ecf3ff;
  border-radius: 4px;
  border: 1px solid #ecf3ff;
}
input:focus-visible {
  border: 1px solid #3e83fa;
  outline: none;
}
input:hover {
  border: 1px solid #3e83fa;
  outline: none;
}
</style>
