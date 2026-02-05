export const els = {
    activityZone: document.querySelector('.trello__activity-zone'),
    globalTime: document.querySelector('.global-time'),
    addTodoBtn: document.querySelector('#btn-add-todo'),
    addModal: document.querySelector('.add-todo-modal'),
    cancelAddBtn: document.querySelector('#add-todo-cancel-btn'),
    todoCards: document.querySelector('#todo-cards'),
    inProgressCards: document.querySelector('#in-progress-cards'),
    doneCards: document.querySelector('#done-cards'),
    submitAddBtn: document.querySelector('#add-todo-submit-btn'),
    addingForm: document.querySelector('#adding-form'),
    addingInput: document.querySelector('#add-todo-modal-input'),
    addingTextArea: document.querySelector('#add-todo-modal-description'),
    deleteAllDoneBtn: document.querySelector('.trello__done-list .delete-all-button'),
    userSelect: document.querySelector('#user-select'),
    todoCount: document.querySelector('.todo-count'),
    inProgressCount: document.querySelector('.in-progress-count'),
    doneCount: document.querySelector('.done-count'),
    inProgressAlert: document.querySelector('.in-progress-allert'),
    inProgressAlertBtn: document.querySelector('#in-progress-alert-btn'),
    deleteAllConfirm: document.querySelector('#delete-all-confirm-btn'),
    deleteAllCancel: document.querySelector('#delete-all-cancel-btn'),
    deleteAllAlert: document.querySelector('.delete-all-alert'),
    colorSelect: document.querySelector('#color-select')
};

export function todoBuilder(todo) {
    const { id, title, description, user, color, createDate, status } = todo;
    let buttons = '';

    if (todo.status === 'todo') {
        buttons = `
            <button class="card-edit-btn card-btn">Edit</button>
            <button class="card-start-btn card-btn">Start todo</button>
            <button class="card-delete-btn card-btn-danger">Delete</button>
        `;
    }

    if (todo.status === 'in-progress') {
        buttons = `
            <button class="card-back-btn card-btn">Back</button>
            <button class="card-complete-btn card-btn-success">Complete</button>
        `;
    }

    if (todo.status === 'done') {
        buttons = `
            <button class="card-delete-btn card-btn-danger">Delete</button>
        `;
    }

    return `
    <div class="card ${color}" id="${id}">
        <p class="card-title">${title}</p>
        <p class="card-description">${description}</p>
        <div class="card-info-wrapper">
            <p class="card-user">User: ${user}</p>
            <p class="card-time">${new Date(createDate).toLocaleDateString()}</p>
        </div>
        <div class="card-buttons">
            ${buttons}
        </div>
    </div>
    `;
}