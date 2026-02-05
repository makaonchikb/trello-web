import { data } from './data.js';

export function setData() {
    localStorage.setItem('all tasks', JSON.stringify(data));
}

export function getData() {
    const saved = localStorage.getItem('all tasks');
    if (!saved) return;

    const parsed = JSON.parse(saved);
    data.length = 0;
    data.push(...parsed);
}