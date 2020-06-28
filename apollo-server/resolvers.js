import GraphQLJSON from 'graphql-type-json'
import shortid from 'shortid'


export default {
  Query: {
    getTodo: async (root, {
      id
    }, {
      db
    }) => {
      const data = db.get('todos').value()
      const todo = data.find(todo => todo.id === id);

      // just for test
      await new Promise(res => setTimeout(res, 300));

      return todo
    },

    getTodos: async (root, args, {
      db
    }) => {

      // just for test
      await new Promise(res => setTimeout(res, 300));

      return db.get('todos').value()
    }
  },

  Mutation: {
    addTodo: async (root, {
      todo
    }, {
      db
    }) => {
      const newTodo = {
        ...todo,
        ...{
          id: shortid.generate()
        }
      }

      db
        .get('todos')
        .push(newTodo)
        .last()
        .write()

      // just for test
      await new Promise(res => setTimeout(res, 300));

      return newTodo
    },

    editTodo: async (root, {
      todo
    }, {
      db
    }) => {
      db
        .get('todos')
        .chain()
        .find({
          id: todo.id
        })
        .assign(todo)
        .write();

      // just for test
      await new Promise(res => setTimeout(res, 300));

      return todo
    },

    deleteTodo: async (root, {
      id
    }, {
      db
    }) => {
      db
        .get('todos')
        .remove({
          id: id
        })
        .write()

      // just for test
      await new Promise(res => setTimeout(res, 300));

      return true;
    },
  },
}