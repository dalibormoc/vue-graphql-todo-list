<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <todo-list></todo-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TodoList from "./TodoList";

export default {
  name: "todo-layout",

  components: {
    TodoList
  }
};
</script>

<style></style>
