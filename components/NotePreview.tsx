import * as React from 'react';
import { Note } from '../types/Note';
import type { Note as INote } from '../types/Note';
import Head from 'next/head';
// import { useNotes } from './context/NotesContext';

function NotePreview({ note, isSelected, ...props }) {
  const [displayDate, setDisplayDate] = React.useState(null);
  React.useEffect(() => {
    setDisplayDate(
      new Date(note.dateEdited).toDateString() === new Date().toDateString()
        ? new Date(note.dateEdited).toLocaleTimeString()
        : new Date(note.dateEdited).toLocaleDateString()
    );
  }, [note]);

  // const [notes, setNotes] = useNotes();

  return (
    <li
      className={`flex justify-between gap-2 p-4 rounded ${
        isSelected && 'bg-gray-200'
      } hover:bg-gray-200 active:bg-gray-300 transition-all duration-100`}
      {...props}
    >
      <div className='flex flex-col gap-2'>
        <div className='font-serif text-lg'>{note.title}</div>
        <div className='text-sm'>{displayDate}</div>
      </div>
      <button
        className='focus:ring ring-red-500'
        onClick={(e) => {
          e.stopPropagation();
          fetch('/api/notes', {
            method: 'DELETE',
            body: JSON.stringify({ id: note.id }),
            headers: { 'Content-Type': 'application/json' },
          });
        }}
      >
        <svg
          className='w-6 h-6 text-red-500 hover:text-red-700'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
          focusable='false'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
        <span className='sr-only'>Delete Note</span>
      </button>
    </li>
  );
}

export default NotePreview;
