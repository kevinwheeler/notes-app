import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Request } from 'express';

import { typedQuery } from '../app/apollo-client';
import Navbar from '../components/navbar';
import { NoteGrid } from '../components/notes-grid';
import Note from '../app/types/note';

export async function getServerSideProps({ req }) {
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

  return {
    props: { user: (req as Request).user, notes: data.notes as Note[] },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Notes: NextPage<Props['props']> = (props) => {
  useEffect(() => {
    window.gtag('event', 'notesOpened');
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-200 dark:bg-gray-800 overflow-x-hidden antialiased">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 mx-8 my-4 mt-24 min-h-[5rem] flex items-center rounded-lg">
        <div className="ml-5 text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer">
          <i className="las la-pencil-alt pr-2"></i>
          <span className="ml-2">Write Your Note</span>
        </div>
      </div>

      <NoteGrid notes={props.notes} />
    </main>
  );
};

export default Notes;
