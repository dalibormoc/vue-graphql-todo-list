<template>
  <v-card max-width="500" class="mx-auto">
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

      <todo-list-item v-for="todo in todosDone" :key="todo.id" :todo="todo" />
    </v-list>
  </v-card>
</template>

<script>
import TodoListItem from "./TodoListItem";

export default {
  name: "todo-list",

  props: {
    filter: {
      type: String,
      default: undefined
    }
  },

  components: {
    TodoListItem
  },

  data() {
    return {
      todos: [
        {
          id: "1",
          label: "Todo 1",
          description: "Todo 1 desciption",
          color: "pink lighten-2",
          done: false
        },
        {
          id: "2",
          label: "Todo 2",
          description: "Todo 2 description",
          color: "blue lighten-2",
          done: false
        },
        {
          id: "3",
          label: "Todo 3",
          description: "Todo 3 description",
          color: "green lighten-2",
          done: true
        }
      ]
    };
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
      alert(todoId);
    },
    deleteTodo(todoId) {
      alert(todoId);
    }
  }
};
</script>

<style></style>
