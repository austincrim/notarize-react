import * as React from 'react';
import marked from 'marked';
import Button from './Button';
import type { Note as INote } from '../types/Note';
import { useNotes } from './hooks';

export default function Note({ note, index, ...props }) {
  const [displayDate, setDisplayDate] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const [editedNote, setEditedNote]: [
    INote,
    React.Dispatch<INote>
  ] = React.useState({ ...note });
  const { notes } = useNotes();

  React.useEffect(() => {
    setDisplayDate(
      new Date(note.dateEdited).toDateString() === new Date().toDateString()
        ? new Date(note.dateEdited).toLocaleTimeString()
        : new Date(note.dateEdited).toLocaleDateString()
    );
  }, [note]);

  React.useEffect(() => {
    setEditedNote({ ...note });
  }, [note]);

  React.useEffect(() => {
    setEditedNote({ ...editedNote, dateEdited: new Date().toISOString() });
  }, [editedNote.content, editedNote.title]);

  return (
    <>
      {note ? (
        <div className='flex justify-between'>
          <div className='flex flex-col gap-2'>
            {!editing ? (
              <h2 className='text-2xl'>{note.title}</h2>
            ) : (
              <input
                className='p-2 bg-gray-100 rounded focus:ring'
                defaultValue={note.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
              />
            )}

            <div className='text-gray-600'>{displayDate}</div>
          </div>
          <div className='space-x-2'>
            {!editing ? (
              <Button onClick={() => setEditing(true)}>Edit</Button>
            ) : (
              <div className='flex flex-col space-y-2 md:block md:space-x-4'>
                <Button
                  onClick={() => {
                    setEditing(false);
                    let newNotes = [...notes];
                    newNotes[index] = { ...editedNote };
                  }}
                  type='primary'
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <React.Fragment />
      )}
      {editing ? (
        <textarea
          defaultValue={note.content}
          onChange={(e) =>
            setEditedNote({ ...editedNote, content: e.target.value })
          }
          className='min-w-full min-h-screen p-2 mt-10 bg-gray-100 rounded focus:ring'
        />
      ) : (
        note && (
          <div
            className='mt-10 prose max-w-1/2'
            dangerouslySetInnerHTML={{ __html: marked(note.content) }}
          ></div>
        )
      )}
    </>
  );
}
