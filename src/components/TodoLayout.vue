<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <todo-list @openCreateEditModal="openCreateEditModal"></todo-list>
      </v-col>
    </v-row>

    <!-- Todo create/edit modal -->
    <modal ref="todoCreateEditModal" scrollable persistent max-width="800">
      <todo-create-edit
        :todoId="todoId"
        @close="$refs.todoCreateEditModal.close()"
      ></todo-create-edit>
    </modal>
  </v-container>
</template>

<script>
import TodoList from "./TodoList";
import TodoCreateEdit from "./TodoCreateEdit";

export default {
  name: "todo-layout",

  components: {
    TodoList,
    TodoCreateEdit
  },

  data: () => ({
    todoId: null
  }),

  methods: {
    openCreateEditModal(todoId) {
      this.todoId = todoId;
      this.$refs.todoCreateEditModal.open();
    }
  }
};
</script>

<style></style>
