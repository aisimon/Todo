<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="main-container">
    <div class="container mt-5">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="text-center">Todo App</h1>
        <button class="btn btn-outline-secondary" @click="toggleDarkMode">
          <i :class="isDarkMode ? 'bi bi-sun' : 'bi bi-moon'"></i>
        </button>
      </div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo">
        <button class="btn btn-primary" @click="addTodo">Add</button>
      </div>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(todo, index) in todos" :key="index">
          {{ todo }}
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">Delete</button>
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
      todos: [],
      isDarkMode: false
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push(this.newTodo.trim());
        this.newTodo = '';
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('bg-dark', this.isDarkMode);
      document.body.classList.toggle('bg-light', !this.isDarkMode);
    }
  }
}
</script>

<style>
.main-container {
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.dark-mode {
  background-color: #212529;
  color: #f8f9fa;
}

.dark-mode .list-group-item {
  background-color: #343a40;
  border-color: #495057;
  color: #f8f9fa;
}

.dark-mode .form-control {
  background-color: #343a40;
  border-color: #495057;
  color: #f8f9fa;
}

.dark-mode .form-control::placeholder {
  color: #adb5bd;
}

.dark-mode .btn-outline-secondary {
    color: #f8f9fa;
    border-color: #f8f9fa;
}

</style>