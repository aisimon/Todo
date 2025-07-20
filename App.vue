<template>
    <div class="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-800 dark:text-white">
        <div class="container mx-auto mt-5 p-1">
            <!-- Header -->
            <div class="flex justify-between items-center mb-3 relative">
                <h1 class="text-center text-2xl font-bold">Todo</h1>
                <button class="p-2 text-white bg-gray-600 rounded-md flex items-center justify-center" @click="copyToClipboard">
                    <i class="fas fa-clipboard"></i>
                </button>
                <!-- Tooltip -->
                <div v-if="showTooltip" class="absolute top-0 right-0 mt-10 mr-2 p-2 bg-gray-700 text-white text-sm rounded shadow-lg transition-opacity duration-500">
                    {{ COPIED_TOOLTIP_TEXT }}
                </div>
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
                <li v-for="(todo, index) in todos" :key="index"
                    :class="{'line-through opacity-50 transition-all duration-500': todo.isDeleting}"
                    class="flex justify-between items-center bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white">
                    <div class="flex items-center">
                        <!-- Checked icon -->
                        <button class="std p-2 text-white rounded-l-md" @click="deleteTodoWithAnimation(index, $event)">
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
import confetti from 'canvas-confetti';
import { TOOLTIP_TIMEOUT, COPIED_TOOLTIP_TEXT } from './constants';

export default {
    data() {
        return {
            newTodo: '',
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            showTooltip: false // Control tooltip visibility
        }
    },
    methods: {
        addTodo() {
            if (this.newTodo.trim() !== '') {
                this.todos.push({ text: this.newTodo.trim(), isEditing: false, isDeleting: false });
                this.newTodo = '';
                this.saveTodos();
            }
        },
        deleteTodoWithAnimation(index, event) {
            this.todos[index].isDeleting = true; // Trigger the animation
            this.triggerConfetti(event); // Trigger confetti effect at mouse location
            setTimeout(() => {
                this.todos.splice(index, 1); // Remove the item after the animation
                this.saveTodos();
            }, 400); // Match the animation duration
        },
        triggerConfetti(event) {
            const { clientX: x, clientY: y } = event; // Get mouse click coordinates
            const { innerWidth: width, innerHeight: height } = window; // Get window dimensions

            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    x: x / width, // Normalize x-coordinate
                    y: y / height // Normalize y-coordinate
                }
            });
        },
        editTodo(index) {
            this.todos[index].isEditing = true;
        },
        saveEdit(index) {
            this.todos[index].isEditing = false;
            this.saveTodos();
        },
        saveTodos() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        copyToClipboard() {
            const markdownList = this.todos.map(todo => `- [ ] ${todo.text}`).join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(markdownList)
                    .then(() => {
                        this.showTooltip = true; // Show tooltip
                        setTimeout(() => {
                            this.showTooltip = false; // Hide tooltip after timeout
                        }, TOOLTIP_TIMEOUT);
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                        alert('Failed to copy to clipboard. Please try again.');
                    });
            } else {
                // Fallback for unsupported browsers
                const textarea = document.createElement('textarea');
                textarea.value = markdownList;
                textarea.style.position = 'fixed'; // Prevent scrolling to bottom
                textarea.style.opacity = '0'; // Hide the textarea
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    document.execCommand('copy');
                    this.showTooltip = true; // Show tooltip
                    setTimeout(() => {
                        this.showTooltip = false; // Hide tooltip after timeout
                    }, TOOLTIP_TIMEOUT);
                } catch (err) {
                    console.error('Fallback: Failed to copy text: ', err);
                    alert('Failed to copy to clipboard. Please try again.');
                }
                document.body.removeChild(textarea);
            }
        }
    },
    mounted() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css');

    button.std {
        width: 60px;
        height: rem(3.5); /* Adjust height to match button size */
    }

    .line-through {
        text-decoration: line-through;
    }

    .opacity-50 {
        opacity: 0.5;
    }
</style>