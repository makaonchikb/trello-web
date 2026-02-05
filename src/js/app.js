import Modal from 'bootstrap/js/dist/modal'
import { els } from './dom.js';
import { data } from './data.js';
import { getData } from './storage.js';
import { renderTodos } from './render.js';
import { populateUserSelect } from './users.js';
import {
    handleFormAccept,
    handleCardActions,
    handleDeleteAllDone,
    clearForm
} from './handlers.js';
import {
    openAddModal,
    closeAddModal,
    openDeleteAllModal,
    closeDeleteAllModal,
    closeInProgressAlert
} from './modal.js';

setInterval(() => {
    let date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    els.globalTime.innerHTML = `${hours} : ${minutes}`;
}, 1000);

// Загрузка пользователей
populateUserSelect();

// Загрузка задач из localStorage
getData();
renderTodos(data);

//Events
const { addTodoBtn, 
    cancelAddBtn, 
    submitAddBtn, 
    addingForm, 
    activityZone, 
    inProgressAlertBtn, 
    deleteAllDoneBtn, 
    deleteAllConfirm, 
    deleteAllCancel } = els;
// Открыть модалку добавления
addTodoBtn.addEventListener('click', openAddModal);

// Закрыть модалку добавления
cancelAddBtn.addEventListener('click', closeAddModal);

// Подтверждение добавления / редактирования
submitAddBtn.addEventListener('click', handleFormAccept);
addingForm.addEventListener('submit', handleFormAccept);

// Клики по карточкам
activityZone.addEventListener('click', handleCardActions);

// Предупреждение "не больше 6 задач"
inProgressAlertBtn.addEventListener('click', closeInProgressAlert);

// Открыть модалку удаления всех DONE
deleteAllDoneBtn.addEventListener('click', openDeleteAllModal);

// Подтвердить удаление всех DONE
deleteAllConfirm.addEventListener('click', handleDeleteAllDone);

// Отмена удаления всех DONE
deleteAllCancel.addEventListener('click', closeDeleteAllModal);






