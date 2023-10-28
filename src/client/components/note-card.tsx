import React, { useState, useEffect, useRef } from 'react';
import { NoteIcon } from './SVGs';
import { Note } from '../app/types/types';
import { NoteFormModal } from './note-form-modal';
import { NoteDeleteModal } from './note-delete-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteNoteAsync } from '../store/notes-slice';

interface NoteCardProps {
  noteId: number;
  color: string;
}

export function NoteCard({ noteId, color }: NoteCardProps) {
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const contextMenuRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const note: Note = useSelector(
    (state: ReduxState) => state.notes.data[noteId],
  );
  const dispatch = useDispatch();
  const firstMenuItemRef = useRef(null);

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setIsContextMenuVisible(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsContextMenuVisible(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target)
    ) {
      setIsContextMenuVisible(false);
    }
  };

  const handleDeleteNote = () => {
    dispatch(deleteNoteAsync({ id: noteId }));
    setIsContextMenuVisible(false);
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

  useEffect(() => {
    if (isContextMenuVisible) {
      setTimeout(() => {
        firstMenuItemRef.current.focus();
      }, 700 + 1); // 1ms more than the duration of the transition. Otherwise focus doesn't work.
    }
  }, [isContextMenuVisible]);

  const toggleContextMenu = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  return (
    <>
      <article
        className={`flex flex-col flex-1 p-5 gap-2 bg-white dark:bg-black dark:shadow-lg dark:shadow-white/50 rounded-xl font-roboto relative max-w-sm group hover:bg-${color} transition-all duration-700`}
        aria-label="Note"
      >
        <div className="flex justify-between items-center">
          <NoteIcon
            className={`border-${color} group-hover:border-white transition-all duration-700 rounded-lg`}
            pathClasses={`text-${color} group-hover:text-white transition-all duration-700`}
          />
          <div className="relative min-h-[1px]" ref={contextMenuRef}>
            <div
              aria-live="polite"
              className="sr-only"
              role="status"
              tabIndex={-1}
            >
              {isContextMenuVisible
                ? 'Context menu is open.'
                : 'Context menu is closed.'}
            </div>
            <button
              onClick={toggleContextMenu}
              aria-label="More options"
              aria-haspopup="true"
              aria-expanded={isContextMenuVisible}
              className=""
            >
              <i className="ri-more-fill text-2xl group-hover:text-white cursor-pointer" />
            </button>
            <ul
              className={`absolute shadow-lg z-20 shadow-black/50 dark:shadow-white/50 rounded-lg justify-center flex flex-col w-36 right-0 bg-white dark:bg-black p-2 transform translate-y-0  transition-all duration-300 ease-in-out text-xl ${
                isContextMenuVisible
                  ? 'pointer-events-auto opacity-100 visible'
                  : 'pointer-events-none opacity-0 translate-y-10 invisible'
              }`}
              role="menu"
            >
              {/* <li className="cursor-pointer">
                <i className="las la-eye mr-3" />
                View
              </li> */}
              <li
                ref={firstMenuItemRef}
                className="cursor-pointer"
                onClick={openEditModal}
                tabIndex={0}
                aria-label="Edit note"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    openEditModal();
                  }
                }}
                role="menuitem"
              >
                <i className="las la-pen mr-3" aria-hidden="true" />
                Edit
              </li>
              <li
                className="cursor-pointer"
                onClick={openDeleteModal}
                tabIndex={0}
                aria-label="Delete note"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDeleteNote();
                  }
                }}
                role="menuitem"
              >
                <i className="las la-trash-alt mr-3" aria-hidden="true" />
                Delete
              </li>
              {/* <li className="cursor-pointer">
                <i className="las la-thumbtack mr-3"></i>
                Pin
              </li> */}
            </ul>
          </div>
        </div>
        <h2 className="mt-2 text-2xl text-black dark:text-white group-hover:text-white [overflow-wrap:break-word]">
          {note.title}
        </h2>
        <p className="text-gray-700 group-hover:text-white  tracking-wide [overflow-wrap:break-word]">
          {note.content}
        </p>
        <div className="mt-6 flex justify-end">
          <div className="text-black dark:text-white group-hover:text-white">
            <i
              className={`las la-calendar mr-2 text-2xl text-${color} group-hover:text-white transition-all duration-700`}
            ></i>
            <time className="align-top">
              {new Date(note.created_at).toLocaleDateString()}
            </time>
          </div>
        </div>
        <div
          className={`after:absolute after:w-full after:h-1 after:bottom-0 after:bg-${color} transition-all  after:duration-700 duration-700 after:rounded-lg after:overflow-hidden after:-ml-5 after:opacity-100 after:translate-y-0 group-hover:after:opacity-0 group-hover:after:-translate-y-3`}
        ></div>
      </article>
      <NoteFormModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        note={note}
        mode="edit"
      />
      <NoteDeleteModal
        isOpen={isDeleteModalOpen}
        noteId={note.id}
        onRequestClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
