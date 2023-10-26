import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../app/types/note';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Record<number, Note> = {};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state[action.payload.id] = action.payload;
    },
    editNote: (state, action: PayloadAction<{ id: number; note: Note }>) => {
      const { id, note } = action.payload;
      if (!state[id] || state[id].id !== id) {
        throw new Error('Invalid note ID');
      }
      state[id] = note;
    },
    setNotes: (state, action: PayloadAction<Record<number, Note>>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.notes,
      };
    });
  },
});

export const { addNotes, editNote, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
