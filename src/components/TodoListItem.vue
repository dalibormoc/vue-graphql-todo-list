<template>
  <v-list-item @click="openTodo" class="text-left">
    <v-list-item-avatar :color="todo.color"> </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="todo.label"></v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="openTodo">
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteTodo">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "todo-list-item",

  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  methods: {
    openTodo() {
      this.$emit("openTodo", this.todo.id);
    },

    deleteTodo() {
      this.$emit("deleteTodo", this.todo.id);
    }
  }
};
</script>

<style></style>
