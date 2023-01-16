import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import {
	addNewEmptyNote,
	setActiveNote,
	savingNewNote,
	setNote,
	setSaving,
	updateNote,
	setPhotosToActiveNote,
	deleteNoteById,
} from './journalSlice';

export const startNewNot = () => {
	return async (dispatch, getState) => {
		dispatch(savingNewNote());
		const { uid } = getState().auth;
		const newNote = {
			title: '',
			body: '',
			imageUrls: [],
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		const setDocResp = await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;
		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		if (!uid) throw new Error('El UID del usuario no existe');

		const notes = await loadNotes(uid);
		dispatch(setNote(notes));
	};
};

export const startSaveNode = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };
		delete noteToFireStore.id;
		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await setDoc(docRef, noteToFireStore, { merge: true });
		dispatch(updateNote());
	};
};

export const startUnloadingFiles = (files = []) => {
	return async dispatch => {
		dispatch(setSaving());

		await fileUpload(files[0]);

		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photoUrls = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photoUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		const resp = await deleteDoc(docRef);
		dispatch(deleteNoteById(note.id));
	};
};
