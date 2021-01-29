import * as React from 'react';
import Image from 'next/image';
import NavItems from './NavItems';
import { useSession } from 'next-auth/client';

export default function MobileNav({ selectedNote }) {
  const [expanded, setExpanded] = React.useState(false);
  const [session, loading] = useSession();

  return (
    <nav className='flex items-center justify-between w-full h-20 p-10 shadow-lg lg:hidden'>
      <div className='flex items-center justify-center'>
        <svg
          className='w-6 h-6 mr-2 text-green-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
          />
        </svg>
        <h1 className='font-serif text-3xl font-bold text-green-400'>
          Notarize
        </h1>
      </div>
      <div className='flex items-center justify-between space-x-10'>
        <button className='focus:ring' onClick={() => setExpanded(!expanded)}>
          <svg
            className='w-8 h-8 text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
      {expanded ? (
        <div className='absolute z-10 p-6 bg-white border rounded-lg shadow-lg right-4 top-16'>
          <ul className='flex flex-col justify-around space-y-4'>
            <NavItems selectedNote={selectedNote} />
          </ul>
        </div>
      ) : (
        <React.Fragment />
      )}
      {expanded ? (
        <div
          onClick={() => setExpanded(false)}
          className='absolute inset-0 bg-gray-200 opacity-50'
        />
      ) : (
        <React.Fragment />
      )}
    </nav>
  );
}
