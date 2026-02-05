import { els } from './dom.js';

export async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        return await response.json();
    } catch {
        return null;
    }
}

export async function populateUserSelect() {
    const users = await fetchUsers();

    if (!users) {
        els.userSelect.innerHTML = `<option value="">Failed to load users</option>`;
        return;
    }

    els.userSelect.innerHTML = users
        .map(u => `<option value="${u.name}">${u.name}</option>`)
        .join('');
}
