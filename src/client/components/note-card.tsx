import React from 'react';
import { NoteIcon } from './SVGs';
import Note from '../app/types/note';

export interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <div className="flex flex-col flex-1 p-5 gap-2 bg-white rounded-xl font-roboto relative ">
      <div className="flex justify-between items-center">
        <NoteIcon
          className="border-red-500 rounded-lg"
          pathClasses="text-red-500"
        />
        <div>
          <i className="las la-thumbtack text-2xl mr-2 cursor-pointer"></i>
          <i className="ri-more-fill text-2xl cursor-pointer"></i>
        </div>
      </div>
      <div className="mt-2 text-2xl text-black">{note.title}</div>
      <p className="text-gray-500  tracking-wide">{note.content}</p>
      <div className="flex justify-end">
        <div className="text-black">
          <i className="las la-calendar mr-2 text-2xl text-red-500"></i>
          <span className="align-top">
            {new Date(note.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      {/* If we have time, we'll animate this sliding and fading out when we highlight the note upon hover. This is why we didn't just use a simple bottom border */}
      <div className="after:absolute after:w-full after:h-1 after:bottom-0 after:border after:border-[#87baf5] after:bg-[#87baf5] after:rounded-lg after:overflow-hidden after:-ml-5"></div>
    </div>
  );
}
