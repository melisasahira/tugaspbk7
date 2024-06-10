// src/stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push({ text: todo, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  },
  getters: {
    incompleteTodosCount(state) {
      return state.todos.filter(todo => !todo.completed).length;
    }
  }
});
