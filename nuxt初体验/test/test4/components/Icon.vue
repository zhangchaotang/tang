<template>
  <i :style="{fontSize:mysize,color}" :class="mylink"></i>
  <!-- <span v-else-if="mode === 'assembly'" class="fa-stack"> -->
  <!-- 外层 -->
  <!-- <slot name="outer" /> -->
  <!-- 里层 -->
  <!-- <slot name="within" />
  </span>-->
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      requied: true
    },
    size: {
      type: [String, Number],
      requied: false,
      default: "m"
    },
    mystyle: {
      type: Object,
      default: function() {
        return {};
      }
    },
    color: {
      type: String,
      default: "#000"
    },
    spin: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    mylink: function() {
      if (!this.spin === false) {
        console.log(!this.spin === false);
        return `fa fa-${this.spin} ${this.link}`;
      } else {
        return `fa ${this.link}`;
      }
    },
    mysize: function() {
      if (typeof this.size === "number") {
        return `${this.size}px`;
      } else {
        if (this.size === "m") {
          return "16px";
        } else if (this.size === "s") {
          return "18px";
        } else if (this.size === "l") {
          return "20px";
        } else if (this.size === "xl") {
          return "22px";
        } else if (this.size === "xxl") {
          return "24px";
        }
      }
    }
  }
};
</script>

<style>
</style>