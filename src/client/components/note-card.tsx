import React, { useState, useEffect, useRef } from 'react';
import { NoteIcon } from './SVGs';
import Note from '../app/types/note';

export interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const contextMenuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target)
    ) {
      setIsContextMenuVisible(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      setIsContextMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const toggleContextMenu = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  return (
    <div className="flex flex-col flex-1 p-5 gap-2 bg-white rounded-xl font-roboto relative">
      <div className="flex justify-between items-center">
        <NoteIcon
          className="border-red-500 rounded-lg"
          pathClasses="text-red-500"
        />
        <div className="relative" ref={contextMenuRef}>
          <i
            className="ri-more-fill text-2xl cursor-pointer"
            onClick={toggleContextMenu}
          ></i>
          {/* view, edit, delete box */}
          {isContextMenuVisible && (
            <ul className="absolute shadow-lg shadow-black/50 rounded-lg justify-center flex flex-col w-36 right-0 bg-white p-2">
              <li className="cursor-pointer">
                <i className="las la-eye mr-3" />
                View
              </li>
              <li className="cursor-pointer">
                <i className="las la-pen mr-3" />
                Edit
              </li>
              <li className="cursor-pointer">
                <i className="las la-trash-alt mr-3" />
                Delete
              </li>
              <li className="cursor-pointer">
                <i className="las la-thumbtack mr-3"></i>
                Pin
              </li>
            </ul>
          )}
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
      <div className="after:absolute after:w-full after:h-1 after:bottom-0 after:border after:bg-red-500 after:rounded-lg after:overflow-hidden after:-ml-5"></div>
    </div>
  );
}
