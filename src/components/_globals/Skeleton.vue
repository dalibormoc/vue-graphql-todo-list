<template>
  <span
    :style="{
      height,
      minWidth,
      maxWidth,
      width: computedWidth,
      borderRadius: radius
    }"
    class="skeleton"
  />
</template>

<script>
export default {
  name: "skeleton",

  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    height: {
      default: "1em",
      type: String
    },
    width: {
      default: null,
      type: String
    },
    minWidth: {
      default: null,
      type: String
    },
    maxWidth: {
      default: null,
      type: String
    },
    radius: {
      default: null,
      type: String
    }
  },

  computed: {
    computedWidth() {
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
        )}%`
      );
    }
  }
};
</script>

<style lang="scss">
.skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  background-color: var(--v-loadingSkeleton-base);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 1.5s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
