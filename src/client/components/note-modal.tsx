import React, { useState } from 'react';
import Modal from 'react-modal';
import { Chain } from '../app/types/zeus/index';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/notes-slice';

export const NoteModal = ({ isOpen, onRequestClose, note, mode }) => {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  Modal.setAppElement('#__next');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const chain = Chain('/graphql');
      if (mode === 'edit') {
        const response = await chain('mutation')({
          updateNote: [
            {
              id: note.id,
              title: title,
              content: content,
            },
            {
              id: true,
              title: true,
              content: true,
              tags: true,
              updated_at: true,
              created_at: true,
            },
          ],
        });
        const updatedNote = response.updateNote;
        dispatch(
          editNote({
            id: note.id,
            note: updatedNote,
          }),
        );
      } else {
        assert(mode === 'create');
      }
      // displayToast(result.message || 'Note saved successfully!', 'success');
      console.log('toast success');
      onRequestClose();
    } catch (error) {
      // displayToast(error.message || 'Error saving the note.', 'error');
      console.log('toast error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white dark:bg-gray-700 rounded-lg w-screen md:max-w-md"
      overlayClassName="fixed flex justify-center items-center p-4 inset-0 z-[1000] bg-gray-700/50"
    >
      <div className="px-6 py-6 lg:px-8">
        <div className="flex justify-between">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            {mode === 'create' ? 'Create Note' : 'Edit Note'}
          </h3>
          <button
            type="button"
            onClick={onRequestClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="note-title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="note-title"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="note-content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Content
            </label>
            <textarea
              id="note-content"
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Note
          </button>
          {isLoading && (
            <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-400">
              Loading...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
