import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/notes-slice';
import { RootState } from '../app/types/types';

export function SearchBar() {
  const dispatch = useDispatch();

  const searchQuery = useSelector(
    (state: RootState) => state.notes.searchQuery,
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
  };

  return (
    <section className="relative">
      <input
        aria-label="Search Notes"
        className="transition-all duration-300 ease-in-out w-0 h-10 pl-10 pr-3 py-2 border rounded-full focus:outline-none focus:w-56 dark:bg-gray-700 dark:text-white"
        id="search-input"
        onChange={handleInputChange}
        placeholder="Search..."
        type="search"
        value={searchQuery}
      />
      <label htmlFor="search-input" className="absolute top-0 left-0 mt-3 ml-3">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </label>
    </section>
  );
}
