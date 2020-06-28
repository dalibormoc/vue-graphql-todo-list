<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :value="isOpened"
    :fullscreen="$vuetify.breakpoint.xs"
  >
    <slot></slot>
  </v-dialog>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "modal",

  data: () => ({
    isOpened: false
  }),

  methods: {
    open() {
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
    toggle() {
      if (this.isOpened) this.close();
      else this.open();
    }
  }
};
</script>

<style></style>
