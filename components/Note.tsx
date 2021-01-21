import * as React from 'react';
import marked from 'marked';
import Button from './Button';
import { useNotes } from './context/NotesContext';

export default function Note({ note, index, ...props }) {
  const displayDate = '01/20/2020';
  const [editing, setEditing] = React.useState(false);
  const [notes, setNotes] = useNotes();
  const [editedNote, setEditedNote] = React.useState({ ...note });

  React.useEffect(() => {
    setEditedNote({ ...note });
  }, [note]);

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
                    setEditedNote({ ...editedNote, dateEdited: new Date() });
                    let newNotes = [...notes];
                    newNotes[index] = { ...editedNote };
                    console.log('new notes', newNotes);
                    setNotes([...newNotes]);
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
