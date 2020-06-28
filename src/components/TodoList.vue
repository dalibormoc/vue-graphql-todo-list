<template>
  <v-card max-width="500" class="mx-auto">
    <v-toolbar color="deep-purple accent-4" dark>
      <v-text-field
        hide-details
        v-model="filter"
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
      :loading="$apollo.queries.todos.loading || deleteLoading"
    >
      <v-list subheader>
        <v-subheader>To Do</v-subheader>

        <todo-list-item
          v-for="todo in todosUndone"
          :key="todo.id"
          :todo="todo"
          @openTodo="openTodo"
          @deleteTodo="deleteTodo"
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
        />
      </v-list>
    </v-card>
  </v-card>
</template>

<script>
// graphql
import GetTodos from "../graphql/GetTodos.gql";
import DeleteTodo from "../graphql/DeleteTodo.gql";

import TodoListItem from "./TodoListItem";

export default {
  name: "todo-list",

  components: {
    TodoListItem
  },

  data: () => ({
    deleteLoading: false,
    filter: null,
    todos: []
    // todos: [
    //   {
    //     id: "1",
    //     label: "Todo 1",
    //     description: "Todo 1 desciption",
    //     color: "pink lighten-2",
    //     done: false
    //   },
    //   {
    //     id: "2",
    //     label: "Todo 2",
    //     description: "Todo 2 description",
    //     color: "blue lighten-2",
    //     done: false
    //   },
    //   {
    //     id: "3",
    //     label: "Todo 3",
    //     description: "Todo 3 description",
    //     color: "green lighten-2",
    //     done: true
    //   }
    // ]
  }),

  apollo: {
    todos: {
      query: GetTodos,
      // variables() {
      //   return {
      //     filter: this.filter
      //   };
      // },
      update: data => data.getTodos
    }
  },

  computed: {
    todosDone() {
      return this.todos
        .filter(todo => todo.done)
        .map(todo => {
          return {
            ...todo,
            ...{ color: todo.color.split(" ")[0] + " lighten-5" }
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

    deleteTodo(todoId) {
      this.deleteLoading = true;

      this.$apollo
        .mutate({
          mutation: DeleteTodo,
          variables: { id: todoId },
          refetchQueries: [
            {
              query: GetTodos
            }
          ]
        })
        .then(data => {
          this.deleteLoading = false;
        })
        .catch(error => {
          // Error
          console.error(error);

          this.deleteLoading = false;
        });
    }
  }
};
</script>

<style></style>
