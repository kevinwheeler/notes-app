import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

export const NoteModal = ({ isOpen, onRequestClose, note, mode }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isLoading, setIsLoading] = useState(false);

  Modal.setAppElement('#__next');

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Let's assume you have a function called saveNote which communicates with your API.
      // const result = await saveNote(note?.id, title, content); // this function should handle both create and update based on if note?.id exists
      console.log(
        'saving. id: ',
        note?.id,
        'title: ',
        title,
        'content: ',
        content,
      );
      if (mode === 'create') {
        onRequestClose();
      }

      // displayToast(result.message || 'Note saved successfully!', 'success');
      console.log('toast success');
    } catch (error) {
      // displayToast(error.message || 'Error saving the note.', 'error');
      console.log('toast error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg w-screen md:max-w-md"
      overlayClassName="fixed flex justify-center items-center p-4 inset-0 z-[1000] bg-gray-700/50"
    >
      {/* <div
        id="note-modal"
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          isOpen ? '' : 'hidden'
        }`}
      >*/}
      {/* <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"> */}
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
      {/* </div>
      </div> */}
      {/* </div> */}
    </Modal>
  );
};
