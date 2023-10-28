import React from 'react';

export function NoteIcon(props) {
  return (
    <div className={`border p-2 ${props.className}`} aria-hidden="true">
      <svg
        width="1.5rem"
        height="1.5rem"
        className="svg-icon"
        id="iq-main-04"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          className={props.pathClasses}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          style={{ strokeDasharray: '78, 98', strokeDashoffset: '0' }}
        ></path>
      </svg>
    </div>
  );
}
