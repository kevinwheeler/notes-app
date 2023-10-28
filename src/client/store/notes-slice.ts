import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, RootState } from '../app/types/types';
import { HYDRATE } from 'next-redux-wrapper';
import { createSelector } from 'reselect';
import { Chain } from '../app/types/zeus';

type CreateNoteArg = {
  title: string;
  content: string;
};

const createNoteAsync = createAsyncThunk<Note, CreateNoteArg>(
  'notes/createNote',
  async ({ title, content }) => {
    const chain = Chain('/graphql');
    const response = await chain('mutation')({
      createNote: [
        {
          title: title,
          content: content,
          tags: [],
        },
        {
          id: true,
          title: true,
          content: true,
          tags: true,
          updated_at: true,
          created_at: true,
        },
      ],
    });
    return response.createNote as Note;
  },
);

type EditNoteArg = CreateNoteArg & {
  id: number;
};

// Asynchronous thunk for editing a note
const editNoteAsync = createAsyncThunk<Note, EditNoteArg>(
  'notes/editNote',
  async ({ id, title, content }, thunkAPI) => {
    const state = thunkAPI.getState() as RootState; // RootState is your store's root state type
    // Ensure the note exists before attempting to edit
    const currentNote = state.notes.data[id];
    if (!currentNote || currentNote.id !== id) {
      throw new Error('Invalid note ID');
    }
    const chain = Chain('/graphql');
    const response = await chain('mutation')({
      updateNote: [
        {
          id: id,
          title: title,
          content: content,
        },
        {
          id: true,
          title: true,
          content: true,
          tags: true,
          updated_at: true,
          created_at: true,
        },
      ],
    });
    return response.updateNote as Note;
  },
);

const initialState = {
  data: {},
  searchQuery: '',
  loading: false,
  error: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotesData: (state, action: PayloadAction<Record<number, Note>>) => {
      state.data = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNoteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNoteAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data[action.payload.id] = action.payload;
      })
      .addCase(createNoteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        throw new Error(action.error.message);
      })

      .addCase(editNoteAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNoteAsync.fulfilled, (state, action) => {
        state.loading = false;
        const note = action.payload;
        state.data[note.id] = note;
      })
      .addCase(editNoteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        throw new Error(action.error.message);
      })

      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          data: { ...state.data, ...action.payload.notes.data },
          searchQuery: action.payload.notes.searchQuery || state.searchQuery,
        };
      });
  },
});

const getNotes = (state) => state.notes.data;
const getSearchQuery = (state) => state.notes.searchQuery;
const getFilteredNotes = createSelector(
  [getNotes, getSearchQuery],
  (notes: Record<string, Note>, searchQuery) => {
    // If there's no search query, return the notes as they are
    if (!searchQuery) return notes;

    // Filter notes based on the search query
    const filteredNotesArray: Note[] = Object.values(notes).filter(
      (note: Note) =>
        note.title.includes(searchQuery) || note.content.includes(searchQuery),
    );

    // Convert the filtered notes array back to an object
    const filteredNotesObject: Record<string, Note> = filteredNotesArray.reduce(
      (acc, note) => {
        acc[note.id] = note;
        return acc;
      },
      {} as Record<string, Note>,
    );

    return filteredNotesObject;
  },
);

export const { setNotesData, setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;

export { getFilteredNotes, createNoteAsync, editNoteAsync };
