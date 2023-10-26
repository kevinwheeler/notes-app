import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../app/types/note';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: Note[] = [];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      return action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return action.payload.notes;
    });
  },
});

export const { setNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;
