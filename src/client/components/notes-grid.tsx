import React from 'react';
import { NoteCard } from './note-card';
import { useSelector } from 'react-redux';
import Note from '../app/types/note';

interface NotesGridProps {
  notes: Record<string, Note>;
}

export function NoteGrid(props: NotesGridProps) {
  const colors = [
    'blue-500',
    'teal-500',
    'yellow-500',
    'purple-500',
    'green-500',
    'pink-500',
  ];
  // This is just to include all of the classes so that Tailwind JIT will include them
  // in the final CSS bundle. It isn't actually unused like it seems.
  const colorClasses = [
    'after:bg-blue-500 text-blue-500 border-blue-500',
    'after:bg-teal-500 text-teal-500 border-teal-500',
    'after:bg-yellow-500 text-yellow-500 border-yellow-500',
    'after:bg-purple-500 text-purple-500 border-purple-500',
    'after:bg-green-500 text-green-500 border-green-500',
    'after:bg-pink-500 text-pink-500 border-pink-500',
  ];

  // Shuffle the colors array to get a randomized order
  const shuffledColors = colors.sort(() => Math.random() - 0.5);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 mx-8 my-4 min-h-[5rem] p-6 flex flex-col rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-3xl">Your Notes</h2>
      </div>
      <div className="flex justify-between">
        <ul className="flex mt-4 text-gray-500">
          <li className="mr-2 pb-2 border-b-2 border-black dark:border-white text-black dark:text-white">
            All
          </li>
          <li className="hover:text-black cursor-pointer">Pinned</li>
        </ul>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-md flex items-center justify-center text-xl h-10 w-10 cursor-pointer">
          <i className="las la-filter  text-gray-500 hover:text-black dark:hover:text-white"></i>
        </div>
      </div>
      <div className="flex gap-4 mt-8 text-gray-500">
        {Object.values(props.notes).map((note, index) => (
          <NoteCard
            key={note.id}
            noteId={note.id}
            color={shuffledColors[index % shuffledColors.length]}
          />
        ))}
      </div>
    </div>
  );
}
