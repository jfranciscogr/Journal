import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		messageSaved: '',
		notes: [],
		active: null,
		// active: {
		//   id: "",
		//   title: "",
		//   body: "",
		//   date: 12345,
		//   imageUrls: [],
		// },
	},
	reducers: {
		savingNewNote: state => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
			state.messageSaved = '';
		},
		setNote: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state, action) => {
			state.isSaving = true;
			state.messageSaved = '';
		},
		updateNote: state => {
			state.isSaving = false;
			state.notes = state.notes.map(note =>
				note.id === state.active.id ? state.active : note
			);
			state.messageSaved = `${state.active.title}, actualizada correctamente`;
		},

		setPhotosToActiveNote: (state, action) => {
			state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
			state.isSaving = false;
		},

		clearNotesLogout: state => {
			state.isSaving = false;
			state.messageSaved = '';
			state.notes = [];
			state.active = null;
		},

		deleteNoteById: (state, action) => {
			state.notes = state.notes.filter(note => note.id !== action.payload);
			state.active = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addNewEmptyNote,
	setActiveNote,
	setNote,
	setSaving,
	updateNote,
	deleteNoteById,
	setPhotosToActiveNote,
	savingNewNote,
	clearNotesLogout,
} = journalSlice.actions;
