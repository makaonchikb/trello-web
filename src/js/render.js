import { els } from './dom.js';
import { todoBuilder } from './dom.js';
import { updateCounts } from './utils.js';

export function renderTodos(todos) {
    els.todoCards.innerHTML = '';
    els.inProgressCards.innerHTML = '';
    els.doneCards.innerHTML = '';

    todos.forEach(todo => {
        const html = todoBuilder(todo);

        if (todo.status === 'todo') els.todoCards.innerHTML += html;
        if (todo.status === 'in-progress') els.inProgressCards.innerHTML += html;
        if (todo.status === 'done') els.doneCards.innerHTML += html;
    });

    updateCounts();
}