import { els } from './dom.js';
import { data, Todo } from './data.js';
import { setData } from './storage.js';
import { renderTodos } from './render.js';
import {
    closeAddModal,
    closeDeleteAllModal,
} from './modal.js';

export let editingTodo = null;

//Добавление / редактирование задачи
export function handleFormAccept(event) {
    event.preventDefault();

    const title = els.addingInput.value.trim();
    const description = els.addingTextArea.value.trim();
    const user = els.userSelect.value;
    const color = els.colorSelect.value;

    if (!title) {
        alert('Введите название');
        return;
    }

    if (editingTodo) {
        // редактирование
        editingTodo.title = title;
        editingTodo.description = description;
        editingTodo.user = user;
        editingTodo.color = color;
        editingTodo = null;
    } else {
        // создание новой
        const todo = new Todo(title, description, user, color);
        data.push(todo);
    }

    setData();
    renderTodos(data);
    clearForm();
    closeAddModal();
}

//Очистка формы
export function clearForm() {
    els.addingInput.value = '';
    els.addingTextArea.value = '';
    editingTodo = null;
}

//Обработка кликов по карточкам
export function handleCardActions(event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const todo = data.find(td => td.id === card.id);
    if (!todo) return;

    if (event.target.classList.contains('card-delete-btn')) {
        deleteTodo(todo);
    }

    if (event.target.classList.contains('card-start-btn')) {
        startTodo(todo);
    }

    if (event.target.classList.contains('card-back-btn')) {
        backTodo(todo);
    }

    if (event.target.classList.contains('card-complete-btn')) {
        completeTodo(todo);
    }

    if (event.target.classList.contains('card-edit-btn')) {
        editTodo(todo);
    }
}

//Удаление всех выполненных задач
export function handleDeleteAllDone() {
    const filtered = data.filter(td => td.status !== 'done');
    data.length = 0;
    data.push(...filtered);

    setData();
    renderTodos(data);
    closeDeleteAllModal();
}

//Удаление одной задачи
export function deleteTodo(todo) {
    const index = data.findIndex(td => td.id === todo.id);
    if (index !== -1) data.splice(index, 1);

    setData();
    renderTodos(data);
}

//Перевод в IN PROGRESS
export function startTodo(todo) {
    const inProgressCount = data.filter(td => td.status === 'in-progress').length;

    if (inProgressCount >= 6) {
        els.inProgressAlert.style.display = 'flex';
        return;
    }

    todo.status = 'in-progress';
    setData();
    renderTodos(data);
}

//Вернуть в TODO
export function backTodo(todo) {
    todo.status = 'todo';
    setData();
    renderTodos(data);
}

//Завершить задачу
export function completeTodo(todo) {
    todo.status = 'done';
    setData();
    renderTodos(data);
}

//Редактирование задачи
export function editTodo(todo) {
    editingTodo = todo;

    els.addingInput.value = todo.title;
    els.addingTextArea.value = todo.description;
    els.userSelect.value = todo.user;
    els.colorSelect.value = todo.color;

    els.addModal.style.display = 'flex';
}
