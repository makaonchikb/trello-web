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
// Открыть модалку добавления
els.addTodoBtn.addEventListener('click', openAddModal);

// Закрыть модалку добавления
els.cancelAddBtn.addEventListener('click', closeAddModal);

// Подтверждение добавления / редактирования
els.submitAddBtn.addEventListener('click', handleFormAccept);
els.addingForm.addEventListener('submit', handleFormAccept);

// Клики по карточкам
els.activityZone.addEventListener('click', handleCardActions);

// Предупреждение "не больше 6 задач"
els.inProgressAlertBtn.addEventListener('click', closeInProgressAlert);

// Открыть модалку удаления всех DONE
els.deleteAllDoneBtn.addEventListener('click', openDeleteAllModal);

// Подтвердить удаление всех DONE
els.deleteAllConfirm.addEventListener('click', handleDeleteAllDone);

// Отмена удаления всех DONE
els.deleteAllCancel.addEventListener('click', closeDeleteAllModal);






