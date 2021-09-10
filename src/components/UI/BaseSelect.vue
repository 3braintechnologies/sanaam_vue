<template>
  <div class="select-root">
    <div class="form-label labelText" v-if="label">
      {{ label }}
    </div>
    <select
      class="form-select"
      :class="{ invalidInput: isValid ? true : false }"
      :style="style"
      :placeholder="placeholder"
      v-model="selectfield"
    >
      <option value="default">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" :value="option.id">{{
        option.name
      }}</option>
    </select>
    <div class="helperText" v-if="helperText">
      {{ helperText }}
    </div>
  </div>
</template>

<script>
export default {
  emits: ["change-value"],
  props: [
    "options",
    "label",
    "placeholder",
    "isValid",
    "helperText",
    "field",
    "value",
    "style"
  ],
  data() {
    return { selectfield: this.value };
  },
  watch: {
    value: function(val) {
      this.selectfield = val;
    },
    selectfield() {
      this.$emit("change-value", this.selectfield, this.field);
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
select {
  padding: 10px;
  color: #150e4a;
  font-size: 16px;
  font-family: MARKPROMEDIUM;
  width: -webkit-fill-available;
  background-color: #ecf3ff;
  border-radius: 4px;
  border: 1px solid #ecf3ff;
}
select:focus-visible {
  border: 1px solid #3e83fa;
  outline: none;
}
select:hover {
  border: 1px solid #3e83fa;
  outline: none;
}
</style>
