import { els } from './dom.js';
import { data } from './data.js';

export function updateCounts() {
    const todoCount = data.filter(td => td.status === 'todo').length;
    const inProgressCount = data.filter(td => td.status === 'in-progress').length;
    const doneCount = data.filter(td => td.status === 'done').length;

    els.todoCount.textContent = todoCount;
    els.inProgressCount.textContent = inProgressCount;
    els.doneCount.textContent = doneCount;
}
