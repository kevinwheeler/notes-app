import React, { useState, useEffect, useRef } from 'react';
import { NoteIcon } from './SVGs';
import { Note } from '../app/types/types';
import { NoteModal } from './note-modal';
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

  const confirmDelete = () => {
    handleDeleteNote();
    closeDeleteModal();
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

  const toggleContextMenu = () => {
    setIsContextMenuVisible(!isContextMenuVisible);
  };

  return (
    <>
      <div className="flex flex-col flex-1 p-5 gap-2 bg-white dark:bg-black dark:shadow-lg dark:shadow-white/50 rounded-xl font-roboto relative max-w-sm">
        <div className="flex justify-between items-center">
          <NoteIcon
            className={`border-${color} rounded-lg`}
            pathClasses={`text-${color}`}
          />
          <div className="relative" ref={contextMenuRef}>
            <i
              className="ri-more-fill text-2xl cursor-pointer"
              onClick={toggleContextMenu}
            ></i>
            {/* view, edit, delete box */}
            {isContextMenuVisible && (
              <ul className="absolute shadow-lg shadow-black/50 dark:shadow-white/50 rounded-lg justify-center flex flex-col w-36 right-0 bg-white dark:bg-black p-2">
                <li className="cursor-pointer">
                  <i className="las la-eye mr-3" />
                  View
                </li>
                <li
                  className="cursor-pointer"
                  onClick={openEditModal}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      openEditModal();
                    }
                  }}
                >
                  <i className="las la-pen mr-3" />
                  Edit
                </li>
                <li
                  className="cursor-pointer"
                  onClick={openDeleteModal}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleDeleteNote();
                    }
                  }}
                >
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
        <div className="mt-2 text-2xl text-black dark:text-white">
          {note.title}
        </div>
        <p className="text-gray-500  tracking-wide">{note.content}</p>
        <div className="mt-6 flex justify-end">
          <div className="text-black dark:text-white">
            <i className={`las la-calendar mr-2 text-2xl text-${color}`}></i>
            <span className="align-top">
              {new Date(note.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* If we have time, we'll animate this sliding and fading out when we highlight the note upon hover. This is why we didn't just use a simple bottom border */}
        <div
          className={`after:absolute after:w-full after:h-1 after:bottom-0 after:bg-${color} after:rounded-lg after:overflow-hidden after:-ml-5`}
        ></div>
      </div>
      <NoteModal
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
