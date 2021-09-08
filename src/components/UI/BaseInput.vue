<template>
  <div class="input-root">
    <div class="labelText" v-if="label">
      {{ label }}
    </div>
    <input
      :class="{ invalidInput: isValid ? true : false }"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      v-model.trim="inputfield"
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
    "value"
  ],
  data() {
    return { inputfield: this.value };
  },
  watch: {
    inputfield() {
      this.$emit("change-value", this.inputfield, this.field);
    }
  }
};
</script>

<style scoped>
.input-root {
  margin-bottom: 20px;
}
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
