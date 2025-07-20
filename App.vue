<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white">
    <div class="container mx-auto mt-5">
      <div class="flex justify-between items-center mb-3">
        <h1 class="text-center text-2xl font-bold">Todo App</h1>
        <button class="p-2 border rounded" @click="toggleDarkMode">
          <span v-if="isDarkMode" class="material-icons">light_mode</span>
          <span v-else class="material-icons">dark_mode</span>
        </button>
      </div>
      <div class="flex mb-3">
        <input type="text" class="flex-grow p-2 border rounded-l-md text-gray-800 dark:text-white bg-white dark:bg-gray-700" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo">
        <button class="p-2 bg-blue-500 text-white rounded-r-md" @click="addTodo">Add</button>
      </div>
      <ul class="space-y-2">
        <li class="flex justify-between items-center p-2 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white" v-for="(todo, index) in todos" :key="index">
          {{ todo }}
          <button class="p-1 bg-red-500 text-white rounded-md" @click="deleteTodo(index)">Delete</button>
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
      isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false // Load dark mode state
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push(this.newTodo.trim());
        this.newTodo = '';
        this.saveTodos();
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode)); // Save dark mode state
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos)); // Save todos to localStorage
    }
  },
  mounted() {
    // Ensure todos and dark mode state are loaded from localStorage on app initialization
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    this.isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
</script>

<style>
/* Tailwind's dark mode styles are now fully handled by the `dark:` prefix. */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>