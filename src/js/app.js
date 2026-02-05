import Modal from 'bootstrap/js/dist/modal'
const data = [];
let editingTodo = null;

const activityZoneElement = document.querySelector('.trello__activity-zone')
const globalTimeElement = document.querySelector('.global-time');
const addTodoBtnElement = document.querySelector('#btn-add-todo');
const addTodosModalElement = document.querySelector('.add-todo-modal');
const cancelTodosModalBtnElement = document.querySelector('#add-todo-cancel-btn');
const todoCardsElement = document.querySelector('#todo-cards');
const inProgressCardsElement = document.querySelector('#in-progress-cards');
const doneCardsElement = document.querySelector('#done-cards');
const submitAddModalBtnElement = document.querySelector('#add-todo-submit-btn');
const addingFormElement = document.querySelector('#adding-form');
const addingInputElement = document.querySelector('#add-todo-modal-input');
const addingTextAreaElement = document.querySelector('#add-todo-modal-description');
const deleteAllDoneBtn = document.querySelector('.trello__done-list .btn-danger');
const selectModalElement = document.querySelector('#user-select');
const todoCountElement = document.querySelector('.todo-count');
const inProgressCountElement = document.querySelector('.in-progress-count');
const doneCountElement = document.querySelector('.done-count');
const inProgressAlertElement = document.querySelector('.in-progress-allert');
const inProgressAlertBtnElement = document.querySelector('#in-progress-alert-btn');
const deleteAllConfirmElement = document.querySelector('#delete-all-confirm-btn');
const deleteAllCancelElement = document.querySelector('#delete-all-cancel-btn');
const deleteAllAlertElement = document.querySelector('.delete-all-alert');
const colorSelectorElement = document.querySelector('#color-select')

//Events
addTodoBtnElement.addEventListener('click', handleOpenAddModal);
cancelTodosModalBtnElement.addEventListener('click', handleCloseAddModal);
submitAddModalBtnElement.addEventListener('click', handleFormAccept);
addingFormElement.addEventListener('submit', handleFormAccept);
activityZoneElement.addEventListener('click', handleCardActions);
deleteAllConfirmElement.addEventListener('click', handleDeleteAllDone);
deleteAllDoneBtn.addEventListener('click', handleThrowDeleteWarning);
inProgressAlertBtnElement.addEventListener('click', handleCloseInProgressAlertModal);
deleteAllCancelElement.addEventListener('click', handleCloseDeleteAllAlert);


//functions
setInterval(() => {
    let date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    globalTimeElement.innerHTML = `${hours} : ${minutes}`;
}, 1000);

function handleFormAccept(event) {
    event.preventDefault();

    if (addingInputElement.value == '') {
        alert('Введите название');
        return;
    }

    const title = addingInputElement.value;
    const description = addingTextAreaElement.value;
    const user = selectModalElement.value;
    const selectedColor = colorSelectorElement.value;

    if (editingTodo) {
        editingTodo.title = title;
        editingTodo.description = description;
        editingTodo.user = user;
        editingTodo.color = selectedColor;

        editingTodo = null;
    } else {
        const todo = new Todo(title, description, user, selectedColor);
        data.push(todo);
    }

    setData();
    renderTodos(data);

    handleCloseAddModal();
    clearForm();
}



function clearForm() {
    addingInputElement.value = '';
    addingTextAreaElement.value = '';
    editingTodo = null;
}

function handleOpenAddModal() {
    addTodosModalElement.style.display = 'flex';
}

function handleCloseAddModal() {
    addTodosModalElement.style.display = 'none';
}

function handleCloseInProgressAlertModal() {
    inProgressAlertElement.style.display = 'none';
}

function handleThrowDeleteWarning() {
    deleteAllAlertElement.style.display = 'flex';
}

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (String(response.status).startsWith('4') || String(response.status).startsWith('5')) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.warn(error);
    }
}

async function populateUserSelect() {
    const users = await fetchUsers();

    if (!users) {
        selectModalElement.innerHTML = `<option value="">Failed to load users</option>`;
        return;
    }

    selectModalElement.innerHTML = users
        .map(user => `<option value="${user.name}">${user.name}</option>`)
        .join('');
}

function updateCounts() {
    const todoCount = data.filter(td => td.status === 'todo').length;
    const inProgressCount = data.filter(td => td.status === 'in-progress').length;
    const doneCount = data.filter(td => td.status === 'done').length;

    todoCountElement.textContent = todoCount;
    inProgressCountElement.textContent = inProgressCount;
    doneCountElement.textContent = doneCount;
}


function handleDeleteTodo(todo) {
    const index = data.findIndex(td => td.id === todo.id);
    if (index !== -1) {
        data.splice(index, 1);
    }
    setData();
    renderTodos(data);
}

function handleCloseDeleteAllAlert() {
    deleteAllAlertElement.style.display = 'none';
}

function handleStartTodo(todo) {
    const inProgressCount = data.filter(td => td.status === 'in-progress').length;

    if (inProgressCount >= 6) {
        inProgressAlertElement.style.display = 'flex';;
        return;
    }

    todo.status = 'in-progress';
    setData();
    renderTodos(data);
}

function handleBackTodo(todo) {
    todo.status = 'todo';
    setData();
    renderTodos(data);
}

function handleCompleteTodo(todo) {
    todo.status = 'done';
    setData();
    renderTodos(data);
}

function handleCardActions(event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const id = card.id;
    const todo = data.find(td => td.id === id);

    if (event.target.classList.contains('card-delete-btn')) {
        handleDeleteTodo(todo);
    }

    if (event.target.classList.contains('card-start-btn')) {
        handleStartTodo(todo);
    }

    if (event.target.classList.contains('card-back-btn')) {
        handleBackTodo(todo);
    }

    if (event.target.classList.contains('card-complete-btn')) {
        handleCompleteTodo(todo);
    }

    if (event.target.classList.contains('card-edit-btn')) {
        handleEditTodo(todo);
    }
}

function handleEditTodo(todo) {
    editingTodo = todo;

    // Заполняем форму
    addingInputElement.value = todo.title;
    addingTextAreaElement.value = todo.description;
    selectModalElement.value = todo.user;
    colorSelectorElement.value = todo.color;

    addTodosModalElement.style.display = 'flex';
}


function handleDeleteAllDone() {
    const filtered = data.filter(td => td.status !== 'done');
    data.length = 0;
    data.push(...filtered);

    setData();
    renderTodos(data);
    deleteAllAlertElement.style.display = 'none';
}



function setData() {
    localStorage.setItem('all tasks', JSON.stringify(data));
}

function getData() {
    const saved = localStorage.getItem('all tasks');
    if (saved) {
        const parsed = JSON.parse(saved);
        data.length = 0;
        data.push(...parsed);
        renderTodos(data);
    }
}

populateUserSelect();
getData();


//Builder
function todoBuilder(todo) {
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
            <button class="card-delete-btn btn btn-danger">Delete</button>
        `;
    }

    return `
    <div class="card ${todo.color}" id="${todo.id}">
        <p class="card-title">${todo.title}</p>
        <p class="card-description">${todo.description}</p>
        <div class="card-info-wrapper">
            <p class="card-user">User: ${todo.user}</p>
            <p class="card-time">${new Date(todo.createDate).toLocaleDateString()}</p>
        </div>
        <div class="card-buttons">
            ${buttons}
        </div>
    </div>
    `;
}


//Constructor 
function Todo(title, text, user, color) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.description = text;
    this.user = user;
    this.status = 'todo';
    this.createDate = new Date();
    this.color = color;
}


//render
function renderTodos(todos) {
    // Очищаем все колонки
    todoCardsElement.innerHTML = '';
    inProgressCardsElement.innerHTML = '';
    doneCardsElement.innerHTML = '';

    todos.forEach(todo => {
        const html = todoBuilder(todo);

        if (todo.status === 'todo') {
            todoCardsElement.innerHTML += html;
        } else if (todo.status === 'in-progress') {
            inProgressCardsElement.innerHTML += html;
        } else if (todo.status === 'done') {
            doneCardsElement.innerHTML += html;
        }
    });

    updateCounts();
}



