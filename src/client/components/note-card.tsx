import React from 'react';
import { NoteIcon } from './SVGs';

export function NoteCard(props) {
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
      <div className="mt-2 text-2xl text-black">Weekly Planner</div>
      <p className="text-gray-500  tracking-wide">
        Virtual Digital Marketing Course every week on Monday, Wednesday and
        Saturday.Virtual Digital Marketing Course every week on Monday{' '}
      </p>
      <div className="flex justify-end">
        <div className="text-black">
          <i className="las la-calendar mr-2 text-2xl text-red-500"></i>
          <span className="align-top">12 Jan 2023</span>
        </div>
      </div>
      {/* If we have time, we'll animate this sliding and fading out when we highlight the note upon hover. This is why we didn't just use a simple bottom border */}
      <div className="after:absolute after:w-full after:h-1 after:bottom-0 after:border after:border-[#87baf5] after:bg-[#87baf5] after:rounded-lg after:overflow-hidden after:-ml-5"></div>
    </div>
  );
}
