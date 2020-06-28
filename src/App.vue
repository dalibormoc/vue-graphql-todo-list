<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Todo list</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <todo-layout></todo-layout>
    </v-main>
  </v-app>
</template>

<script>
import TodoLayout from "./components/TodoLayout";

export default {
  name: "App",

  components: {
    TodoLayout
  },

  data: () => ({
    //
  })
};
</script>
