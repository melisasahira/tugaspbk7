<template>
  <div id="app">
    <h1>Todo List</h1>
    <div class="input-container">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" />
      <button @click="addTodo">Add</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="index" class="todo-item">
        <input type="checkbox" v-model="todo.completed" @change="toggleTodo(index)" />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="remove-btn">Remove</button>
      </li>
    </ul>
    <p class="incomplete-text" v-if="incompleteTodosCount > 0">Incomplete tasks: {{ incompleteTodosCount }}</p>
    <p class="complete-message" v-else>All tasks completed!</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';

export default {
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todoStore.addTodo(newTodo.value.trim());
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTodo = (index) => {
      todoStore.toggleTodo(index);
    };

    return {
      newTodo,
      addTodo,
      removeTodo,
      toggleTodo,
      todos: todoStore.todos,
      incompleteTodosCount: todoStore.incompleteTodosCount
    };
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  transition: all 0.3s ease;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #f4e1ac; /* Warna merah */
}

.input-container {
  display: flex;
  margin-bottom: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #9c7336; /* Warna merah */
  transition: border-color 0.3s ease;
}

button {
  padding: 8px 15px;
  background-color: #936d26; /* Warna merah */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #986d3b; /* Warna merah yang sedikit lebih gelap */
}

ul {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}

.remove-btn {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #9c6b11; /* Warna merah */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #c82333; /* Warna merah yang sedikit lebih gelap */
}

.incomplete-text {
  margin-top: 10px;
  text-align: center;
  color: #e1d387; /* Warna merah */
}

.complete-message {
  margin-top: 10px;
  text-align: center;
  color: #28a745; /* Warna hijau */
  font-weight: bold;
}
</style>
