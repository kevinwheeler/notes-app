import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Note from '../app/types/note';
import { HYDRATE } from 'next-redux-wrapper';
import { createSelector } from 'reselect';

const initialState = {
  data: {},
  searchQuery: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.data[action.payload.id] = action.payload;
    },
    editNote: (state, action: PayloadAction<{ id: number; note: Note }>) => {
      const { id, note } = action.payload;
      if (!state.data[id] || state.data[id].id !== id) {
        throw new Error('Invalid note ID');
      }
      state.data[id] = note;
    },
    setNotesData: (state, action: PayloadAction<Record<number, Note>>) => {
      state.data = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        data: { ...state.data, ...action.payload.notes.data },
        searchQuery: action.payload.notes.searchQuery || state.searchQuery,
      };
    });
  },
});

const getNotes = (state) => state.notes.data;
const getsearchQuery = (state) => state.notes.searchQuery;
export const getFilteredNotes = createSelector(
  [getNotes, getsearchQuery],
  (notes, searchQuery) => {
    if (!searchQuery) return Object.values(notes);

    return Object.values(notes).filter(
      (note: Note) =>
        note.title.includes(searchQuery) || note.content.includes(searchQuery),
    );
  },
);

export const { addNote, editNote, setNotesData } = notesSlice.actions;
export default notesSlice.reducer;
