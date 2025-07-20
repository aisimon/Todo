<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white">
    <div class="container mx-auto mt-5 p-1">
      <!-- Header -->
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-center text-2xl font-bold">Todo</h1>
      </div>
      <!-- Add new todo -->
      <div class="flex mb-3">
        <button class="std p-2 bg-blue-500 text-white rounded-l-md flex items-center justify-center" @click="addTodo()">
          <i class="fas fa-plus"></i>
        </button>
        <input type="text" class="flex-grow p-2 border rounded-r-md text-gray-800 dark:text-white bg-white dark:bg-gray-700"
          v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo">
      </div>
      <!-- List of Todos -->
      <ul class="space-y-2">
        <li class="flex justify-between items-center bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white"
          v-for="(todo, index) in todos" :key="index">
          <div class="flex items-center">
            <button class="std p-2  text-white rounded-l-md" @click="deleteTodo(index)">
              <i class="fas fa-circle"></i>
            </button>
            <!-- List item -->
            <span v-if="!todo.isEditing" class="p-2" @dblclick="editTodo(index)">{{ todo.text }}</span>
            <!-- List Edit -->
            <input v-else type="text"
              class="p-2 border rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-700"
              v-model="todo.text" @blur="saveEdit(index)" @keyup.enter="saveEdit(index)">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: JSON.parse(localStorage.getItem('todos')) || [], // Load todos from localStorage
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo.trim(), isEditing: false });
        this.newTodo = '';
        this.saveTodos();
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    editTodo(index) {
      this.todos[index].isEditing = true;
    },
    saveEdit(index) {
      this.todos[index].isEditing = false;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos)); // Save todos to localStorage
    }
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }
}
</script>

<style>
/* Tailwind's dark mode styles are now fully handled by the `dark:` prefix. */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');

button.std {
  width: 60px;
  height: rem(3.5); /* Adjust height to match button size */
}
</style>