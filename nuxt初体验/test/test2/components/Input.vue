<template>
  <div class="gt-input">
    <Icon class="front" type="111" />
    <input type="text" :style="mysize" />
    <!-- <slot name="rear" /> -->
  </div>
</template>

<script>
import Icon from "~/components/Icon";

export default {
  props: {
    size: {
      type: String,
      default: "m"
    }
  },
  computed: {
    mysize: function() {
      if (this.size === "m") {
        return {
          padding: "8px 7px"
        };
      }
    }
  },
  components: {
    Icon
  }
};
</script>
<style lang="scss">
.gt-input {
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  border: 1px solid #777;
  border-radius: 3px;
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: none;
    outline: none;
  }
  .front,
  .rear {
    margin: 0 2px;
  }

}
</style>