import { els } from './dom.js';
import {
    clearForm
} from './handlers.js'

export function openAddModal() {
    els.addModal.style.display = 'flex';
}

export function closeAddModal() {
    els.addModal.style.display = 'none';
    clearForm();
}

export function openDeleteAllModal() {
    els.deleteAllAlert.style.display = 'flex';
}

export function closeDeleteAllModal() {
    els.deleteAllAlert.style.display = 'none';
}

export function closeInProgressAlert() {
    els.inProgressAlert.style.display = 'none';
}