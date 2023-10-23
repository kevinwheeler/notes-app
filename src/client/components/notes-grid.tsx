import React from 'react';
import { NoteCard } from './note-card';
import Note from '../app/types/note';

export interface NotesGridProps {
  notes: Note[];
}

export function NoteGrid(props: NotesGridProps) {
  return (
    <div className="bg-gray-50 mx-8 my-4 min-h-[5rem] p-6 flex flex-col rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-3xl">Your Notes</h2>
      </div>
      <div className="flex justify-between">
        <ul className="flex mt-4 text-gray-500">
          <li className="mr-2 pb-2 border-b-2 border-black text-black">All</li>
          <li className="hover:text-black cursor-pointer">Pinned</li>
        </ul>
        <div className="bg-gray-100 rounded-md flex items-center justify-center text-xl h-10 w-10 cursor-pointer">
          <i className="las la-filter  text-gray-500 hover:text-black"></i>
        </div>
      </div>
      <div className="flex gap-4 mt-8 text-gray-500">
        {props.notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}
