import React, { useState } from 'react';
import { NoteFormModal } from './note-form-modal';

export function NoteCreator() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 mx-8 my-4 mt-24 min-h-[5rem] flex items-center rounded-lg">
        <div
          className="ml-5 flex items-center text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="las la-pencil-alt"></i>
          <h1 className="ml-2">Write Your Note</h1>
        </div>
      </section>
      <NoteFormModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        mode="create"
      />
    </>
  );
}
