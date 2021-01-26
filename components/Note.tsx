import * as React from 'react';
import marked from 'marked';
import Button from './Button';
import { useNotes } from './hooks';

export default function Note({ note, ...props }) {
  const [displayDate, setDisplayDate] = React.useState(null);
  const [editing, setEditing] = React.useState(false);
  const [editedNote, setEditedNote] = React.useState({ ...note });
  const { saveMutation } = useNotes();

  React.useEffect(() => {
    if (!note) return
    setDisplayDate(
      new Date(note.dateEdited).toDateString() === new Date().toDateString()
        ? new Date(note.dateEdited).toLocaleTimeString()
        : new Date(note.dateEdited).toLocaleDateString()
    );
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
                    saveMutation.mutate(editedNote)
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
          className='min-w-full p-2 mt-10 overflow-y-auto bg-gray-100 rounded h-3/4 focus:ring'
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
