<template>
  <v-card>
    <v-card-title>
      <v-avatar
        class="mr-3"
        :color="todo.color || 'grey lighten-2'"
        size="36"
      ></v-avatar>
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="todo.label"
          label="Title"
          :loading="$apollo.queries.todo.loading"
          required
        ></v-text-field>

        <v-textarea v-model="todo.description" label="Description"></v-textarea>

        <v-select
          v-model="todo.color"
          :items="colors"
          item-value="id"
          :loading="$apollo.queries.todo.loading"
          label="Color"
        ></v-select>

        <v-checkbox
          v-model="todo.done"
          :loading="$apollo.queries.todo.loading"
          label="Done"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="closeModal">Cancel</v-btn>
      <v-btn @click="saveModal" :loading="$apollo.queries.todo.loading"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
// graphql
import GetTodos from "../graphql/GetTodos.gql";
import GetTodo from "../graphql/GetTodo.gql";
import AddTodo from "../graphql/AddTodo.gql";
import EditTodo from "../graphql/EditTodo.gql";

export default {
  name: "todo-create-edit",

  props: {
    todoId: {
      type: String
    }
  },

  watch: {
    todoId: {
      immediate: true,
      handler(newVal, oldVal) {
        this.todo = { ...this.todoDefaults };
      }
    }
  },

  data: () => ({
    todo: null,
    todoDefaults: {
      id: null,
      label: null,
      description: null,
      color: null,
      done: false
    },
    colors: [
      { id: "blue lighten-2", text: "Blue" },
      { id: "red lighten-2", text: "Red" },
      { id: "yellow lighten-2", text: "Yellow" },
      { id: "pink lighten-2", text: "Pink" },
      { id: "green lighten-2", text: "Green" }
    ]
  }),

  apollo: {
    todo: {
      query: GetTodo,
      variables() {
        return {
          id: this.todoId
        };
      },
      update: data => data.getTodo,
      skip() {
        return !this.todoId;
      }
    }
  },

  computed: {
    title() {
      return this.todoId ? "Edit todo" : "Create todo";
    }
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },
    saveModal() {
      // edit
      if (this.todo.id) {
        if (this.todo.__typename) delete this.todo.__typename;

        this.$apollo
          .mutate({
            mutation: EditTodo,
            variables: { todo: this.todo },
            refetchQueries: [
              {
                query: GetTodos
              }
            ]
          })
          .then(data => {
            this.closeModal();
          })
          .catch(error => {
            // Error
            console.error(error);
          });
      }

      // create
      else {
        this.$apollo
          .mutate({
            mutation: AddTodo,
            variables: { todo: this.todo },
            refetchQueries: [
              {
                query: GetTodos
              }
            ]
          })
          .then(data => {
            this.closeModal();
          })
          .catch(error => {
            // Error
            console.error(error);
          });
      }
    }
  }
};
</script>

<style></style>
