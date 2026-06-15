import {getTodos, addTodo} from './todos-api.js';
import {startImageRefresher} from './refresh-image.js';

const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');

const renderTodos = (todos) => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo;
        todoList.appendChild(li);
    });
};

const loadTodos = async () => {
    try {
        const todos = await getTodos();
        renderTodos(todos);
    } catch (error) {
        console.error('Error loading todos:', error);
    }
};

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value.trim();
    if (text) {
        try {
            await addTodo(text);
            e.target.elements.text.value = '';
            loadTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
});

loadTodos();
startImageRefresher();