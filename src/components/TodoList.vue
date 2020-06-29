<template>
  <v-card max-width="500" class="mx-auto">
    <v-toolbar color="deep-purple accent-4" dark>
      <v-text-field
        hide-details
        v-model="filter"
        placeholder="Search..."
        prepend-icon="mdi-magnify"
        single-line
        clearable
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon @click="openTodo(null)">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card
      flat
      class="rounded-t-0"
      :loading="$apollo.queries.todos.loading || loading"
    >
      <v-list subheader>
        <v-subheader>To Do</v-subheader>

        <todo-list-item
          v-for="todo in todosUndone"
          :key="todo.id"
          :todo="todo"
          @openTodo="openTodo"
          @deleteTodo="deleteTodo"
          @markTodoDoneUndone="markTodoDoneUndone"
        />
      </v-list>

      <v-divider></v-divider>

      <v-list subheader>
        <v-subheader>Done</v-subheader>

        <todo-list-item
          v-for="todo in todosDone"
          :key="todo.id"
          :todo="todo"
          @openTodo="openTodo"
          @deleteTodo="deleteTodo"
          @markTodoDoneUndone="markTodoDoneUndone"
        />
      </v-list>
    </v-card>
  </v-card>
</template>

<script>
// graphql
import GetTodos from "../graphql/GetTodos.gql";
import DeleteTodo from "../graphql/DeleteTodo.gql";
import MarkTodoDoneUndone from "../graphql/MarkTodoDoneUndone.gql";

import TodoListItem from "./TodoListItem";

export default {
  name: "todo-list",

  components: {
    TodoListItem
  },

  data: () => ({
    loading: false,
    todos: []
  }),

  apollo: {
    todos: {
      query: GetTodos,
      variables() {
        return {
          filter: this.filter
        };
      },
      update: data => data.getTodos
    }
  },

  computed: {
    filter: {
      get() {
        return this.$store.state.filter;
      },
      set(value) {
        this.$store.commit("SET_FILTER", value);
      }
    },
    todosDone() {
      return this.todos
        .filter(todo => todo.done)
        .map(todo => {
          return {
            ...todo,
            ...{
              color: todo.color
                ? todo.color.split(" ")[0] + " lighten-5"
                : "grey lighten-5"
            }
          };
        });
    },
    todosUndone() {
      return this.todos.filter(todo => !todo.done);
    }
  },

  methods: {
    openTodo(todoId) {
      this.$emit("openCreateEditModal", todoId);
    },

    markTodoDoneUndone(todoId) {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: MarkTodoDoneUndone,
          variables: { id: todoId },
          refetchQueries: [
            {
              query: GetTodos,
              variables: { filter: this.filter }
            }
          ]
        })
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          // Error
          console.error(error);

          this.loading = false;
        });
    },

    deleteTodo(todoId) {
      this.loading = true;

      this.$apollo
        .mutate({
          mutation: DeleteTodo,
          variables: { id: todoId },
          refetchQueries: [
            {
              query: GetTodos,
              variables: { filter: this.filter }
            }
          ]
        })
        .then(() => {
          this.loading = false;
        })
        .catch(error => {
          // Error
          console.error(error);

          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
