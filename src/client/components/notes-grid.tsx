import React from 'react';
import { NoteCard } from './note-card';
import { useSelector } from 'react-redux';
import { Note } from '../app/types/types';

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
    'orange-500',
  ];
  // This is so that Tailwind JIT will include all of these classes
  // in the final CSS bundle. It isn't actually unused like it seems.
  const colorClasses = [
    'after:bg-blue-500 hover:bg-blue-500 text-blue-500 border-blue-500',
    'after:bg-teal-500 hover:bg-teal-500 text-teal-500 border-teal-500',
    'after:bg-yellow-500 hover:bg-yellow-500 text-yellow-500 border-yellow-500',
    'after:bg-purple-500 hover:bg-purple-500 text-purple-500 border-purple-500',
    'after:bg-green-500 hover:bg-green-500 text-green-500 border-green-500',
    'after:bg-pink-500 hover:bg-pink-500 text-pink-500 border-pink-500',
  ];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-8 text-gray-500">
      {Object.keys(props.notes).length
        ? Object.values(props.notes).map((note, index) => (
            <NoteCard
              key={note.id}
              noteId={note.id}
              color={colors[index % colors.length]}
            />
          ))
        : "It's a fresh start! Create your first note to begin."}
    </div>
  );
}
