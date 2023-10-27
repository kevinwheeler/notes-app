import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';
import Navbar from '../components/navbar';
import { NoteGrid } from '../components/notes-grid';
import { Note } from '../app/types/types';
import { getFilteredNotes, setNotesData } from '../store/notes-slice';
import { wrapper } from '../store';
import { useSelector } from 'react-redux';
import { NotesSelector } from '../components/notes-selector';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const { data } = await typedQuery(
        {
          notes: {
            id: true,
            title: true,
            content: true,
            tags: true,
            created_at: true,
          },
        },
        req,
        undefined,
        { fetchPolicy: 'network-only' }, //prevent caching
      );

      // convert from array to object, so we can access each note by id.
      const notesObject = data.notes.reduce((acc, note) => {
        acc[note.id] = note;
        return acc;
      }, {});

      store.dispatch(setNotesData(notesObject));

      return {
        //TODO perhaps save user in a store instead
        props: { user: (req as Request).user },
      };
    },
);

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Notes: NextPage<Props['props']> = (props) => {
  // useEffect(() => {
  //   window.gtag('event', 'notesOpened');
  // }, []);

  // const notes: Record<string, Note> = useSelector((state: RootState) => {
  //   return state.notes.data;
  // });
  const notes: Record<string, Note> = useSelector(getFilteredNotes);
  // console.log('kmw notes = ', notes);

  return (
    <main className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-800 overflow-x-hidden antialiased">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 mx-8 my-4 mt-24 min-h-[5rem] flex items-center rounded-lg">
        <div className="ml-5 text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer">
          <i className="las la-pencil-alt pr-2"></i>
          <span className="ml-2">Write Your Note</span>
        </div>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 mx-8 my-4 min-h-[5rem] p-6 flex flex-col rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl dark:text-white">Your Notes</h2>
        </div>
        <NotesSelector />
        <NoteGrid notes={notes} />
      </section>
    </main>
  );
};

export default Notes;
