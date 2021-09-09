<template>
  <button class="btn" :type="type" @click="onClick" :style="style">
    <slot></slot>
  </button>
</template>

<script>
import theme from "../../theme";
export default {
  props: ["type", "onClick", "stylevariant"],
  computed: {
    style() {
      return `background-color: ${
        this.stylevariant
          ? this.stylevariant === "primary"
            ? theme.colors.DodgerBlue
            : this.stylevariant === "secondary1"
            ? theme.colors.Violet
            : this.stylevariant === "secondary2"
            ? theme.colors.White
            : this.stylevariant === "secondary3"
            ? theme.colors.MintGreen
            : this.stylevariant === "danger"
            ? theme.colors.Monza
            : "auto"
          : "auto"
      };
      color:${
        this.stylevariant
          ? this.stylevariant === "primary"
            ? theme.colors.White
            : this.stylevariant === "secondary1"
            ? theme.colors.MintGreenLight
            : this.stylevariant === "secondary2"
            ? theme.colors.DodgerBlue
            : this.stylevariant === "secondary3"
            ? theme.colors.Violet
            : this.stylevariant === "danger"
            ? theme.colors.White
            : "auto"
          : "auto"
      };
      border:${
        this.stylevariant
          ? this.stylevariant === "primary"
            ? `1px solid ${theme.colors.DodgerBlue}`
            : this.stylevariant === "secondary1"
            ? `1px solid ${theme.colors.Violet}`
            : this.stylevariant === "secondary2"
            ? `1px solid ${theme.colors.DodgerBlue}`
            : this.stylevariant === "secondary3"
            ? `1px solid ${theme.colors.MintGreen}`
            : this.stylevariant === "danger"
            ? `1px solid ${theme.colors.Monza}`
            : "auto"
          : "auto"
      };
      border-radius:21px;
      text-transform: capitalize;
      padding: 6px 16px; 
      width:-webkit-fill-available;cursor:pointer;`;
    }
  }
};
</script>
