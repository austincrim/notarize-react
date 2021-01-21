import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Note } from '../../types/Note';
import { useLocalStorage } from '../hooks';

const NotesContext = React.createContext(null);

export function NotesProvider(props) {
  const [notes, setNotes] = useLocalStorage('notes', [
    {
      id: uuid(),
      title: 'My First Note!',
      content: 'Enter some Markdown here!',
      dateEdited: new Date().toISOString(),
    },
  ]);
  return <NotesContext.Provider value={[notes, setNotes]} {...props} />;
}

export function useNotes() {
  const context = React.useContext(NotesContext);
  // local storage stuff here
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
}
