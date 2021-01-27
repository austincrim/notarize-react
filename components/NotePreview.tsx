import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNotes } from './hooks';
import Spinner from './loading/Spinner';
import TrashIcon from './icons/TrashIcon';

function NotePreview({ note, isSelected, ...props }) {
  const [displayDate, setDisplayDate] = React.useState(null);
  const { deleteMutation } = useNotes();

  React.useEffect(() => {
    setDisplayDate(
      new Date(note.dateEdited).toDateString() === new Date().toDateString()
        ? new Date(note.dateEdited).toLocaleTimeString()
        : new Date(note.dateEdited).toLocaleDateString()
    );
  }, [note]);

  return (
    <li
      className={`flex justify-between items-center gap-2 p-4 rounded ${
        isSelected && 'bg-gray-200'
      } hover:bg-gray-200 active:bg-gray-300 transition-all duration-100`}
      {...props}
    >
      <div className='flex flex-col gap-2'>
        <div className='font-serif text-lg'>{note.title}</div>
        <div className='text-sm'>{displayDate}</div>
      </div>
      {deleteMutation.status !== 'loading' ? (
        <button
          className='focus:ring ring-red-500'
          onClick={(e) => {
            e.stopPropagation();
            deleteMutation.mutate(note.id);
          }}
        >
          <TrashIcon />
          <span className='sr-only'>Delete Note</span>
        </button>
      ) : (
        <span className='text-red-500'>
          <Spinner />
        </span>
      )}
    </li>
  );
}

export default NotePreview;
