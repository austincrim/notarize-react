import * as React from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/client';
import { useNotes } from '../components/hooks';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';
import Button from '../components/Button';
import NotePreview from '../components/NotePreview';
import Note from '../components/Note';
import AddIcon from '../components/icons/AddIcon';
import SearchInput from '../components/SearchInput';
import Spinner from '../components/loading/Spinner';

export default function Home() {
  const [searchText, setSearchText] = React.useState('');
  const { notes, status, addMutation } = useNotes();
  const [selectedNote, setSelectedNote] = React.useState(null);
  const [session] = useSession();

  React.useEffect(() => {
    if (status !== 'success') return;
    if (!notes[0]) {
      setSelectedNote(null);
    } else if (!notes.find((n) => n.id === selectedNote?.id)) {
      setSelectedNote(null);
    }
  }, [notes]);

  return (
    <div>
      <Head>
        <title>Notarize</title>
      </Head>
      <main>
        <MobileNav selectedNote={selectedNote} />
        <div className='grid min-h-screen grid-cols-1 p-8 lg:grid-cols-4 lg:gap-4'>
          <ul className='row-start-3 space-y-4 lg:pr-8 lg:row-start-auto lg:border-r'>
            <SearchInput setSearchText={setSearchText} />
            {status === 'success' ? (
              notes
                .filter((note) => note.title.toLowerCase().includes(searchText))
                .map((note) => (
                  <NotePreview
                    key={note.id}
                    note={note}
                    isSelected={selectedNote === note}
                    onClick={() => setSelectedNote(note)}
                  />
                ))
            ) : (
              <li>No notes yet!</li>
            )}
            <Button
              disabled={!session}
              type='primary'
              className='flex justify-center w-full'
              onClick={() =>
                addMutation.mutate({
                  title: 'New Note',
                  content: 'Write some Markdown here!',
                })
              }
            >
              {addMutation.isLoading ? (
                <Spinner />
              ) : (
                <span className='flex items-center justify-center'>
                  <AddIcon />
                  Add Note
                </span>
              )}
            </Button>
          </ul>
          <div className='px-4 lg:col-span-2'>
            {session && selectedNote ? (
              <Note note={notes.find((n) => n.id === selectedNote.id)} />
            ) : session && !selectedNote ? (
              <React.Fragment />
            ) : (
              <div className='mt-10 text-2xl text-center'>
                Sign in to view and edit your notes!
              </div>
            )}
          </div>

          <div className='flex flex-col justify-end row-start-4 lg:row-start-auto lg:justify-between lg:border-l'>
            <Nav selectedNote={selectedNote} />
            <footer className='w-full text-sm text-center text-gray-500'>
              Austin Crim | 2021
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
