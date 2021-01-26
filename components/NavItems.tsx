import Button from './Button';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function NavItems({ selectedNote }) {
  const [session, loading] = useSession();
  return (
    <ul className='flex flex-col space-y-8 text-center'>
      <li>
        <a
          download={selectedNote?.title}
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
            selectedNote?.content
          )}`}
        >
          <Button tabIndex={-1} type='primary' className='w-full'>
            Download Note
          </Button>
        </a>
      </li>
      <li>
        <a href='https://github.com/austincrim/notarize'>
          <Button
            tabIndex={-1}
            className='flex items-center w-full'
            type='dark'
          >
            <Image
              width='32'
              height='32'
              alt='github logo'
              src='/images/github-logo-light.png'
            />
            <span className='ml-2'>View Source</span>
          </Button>
        </a>
      </li>
      {!session ? (
        <li>
          <Button
            onClick={() => {
              signIn();
            }}
            className='w-full'
          >
            Sign In
          </Button>
        </li>
      ) : (
        <li>
          <Button className='w-full' onClick={() => signOut()}>
            Log Out
          </Button>
        </li>
      )}
    </ul>
  );
}
