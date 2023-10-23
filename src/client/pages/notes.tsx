import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { Request } from 'express';
import Image from 'next/image';

import { typedQuery } from '../app/apollo-client';
//import navbar
import Navbar from '../components/navbar';
import { NoteIcon } from '../components/SVGs';
import { NoteCard } from '../components/note-card';

export async function getServerSideProps({ req }) {
  const { data } = await typedQuery(
    { notes: { id: true, title: true, content: true, tags: true } },
    req,
  );

  return {
    props: { user: (req as Request).user, notes: data.notes },
  };
}

type Props = ExtractPromiseType<ReturnType<typeof getServerSideProps>>;

const Notes: NextPage<Props['props']> = (props) => {
  useEffect(() => {
    window.gtag('event', 'notesOpened');
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-200 overflow-x-hidden antialiased">
      <Navbar />
      {/* Write your note  */}
      <div className="bg-gray-50 mx-8 my-4 mt-24 min-h-[5rem] flex items-center rounded-lg">
        <div className="ml-5 text-gray-500 hover:text-black cursor-pointer">
          <i className="las la-pencil-alt pr-2"></i>
          <span className="ml-2">Write Your Note</span>
        </div>
      </div>

      {/* Main notes section */}
      <div className="bg-gray-50 mx-8 my-4 min-h-[5rem] p-6 flex flex-col rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-3xl">Your Notes</h2>
        </div>
        <div className="flex justify-between">
          <ul className="flex mt-4 text-gray-500">
            <li className="mr-2 pb-2 border-b-2 border-black text-black">
              All
            </li>
            <li className="hover:text-black cursor-pointer">Pinned</li>
          </ul>
          <div className="bg-gray-100 rounded-md flex items-center justify-center text-xl h-10 w-10 cursor-pointer">
            <i className="las la-filter  text-gray-500 hover:text-black"></i>
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-gray-500">
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
        <div className="flex gap-4 mt-8 text-gray-500">
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </main>
  );
};

export default Notes;
