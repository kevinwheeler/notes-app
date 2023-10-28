import React from 'react';
import { SearchBar } from './search-bar';
export function NotesSelector() {
  return (
    <section className="flex justify-between" aria-label="Notes Selectors">
      <nav aria-label="Note categories">
        <ul className="flex mt-4 text-gray-500">
          <li className="mr-2 pb-2 border-b-2 border-black dark:border-white text-black dark:text-white">
            All
          </li>
          <li
            className="hover:text-black cursor-pointer"
            onClick={() => alert("This feature hasn't been implemented yet.")}
          >
            Pinned
          </li>
        </ul>
      </nav>
      <SearchBar />
      {/* <i className="las la-filter  text-gray-500 hover:text-black dark:hover:text-white"></i> */}
    </section>
  );
}
