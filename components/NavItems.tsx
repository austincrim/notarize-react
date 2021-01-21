import Button from './Button';
import Image from 'next/image';

export default function NavItems({ selectedNote }) {
  return (
    <ul className='flex flex-col space-y-8 text-center'>
      <li>
        <a
          download={selectedNote?.title}
          href={`data:text/plain;charset=utf-8,${encodeURIComponent(
            selectedNote?.content
          )}`}
        >
          <Button type='primary' className='w-full'>Download Note</Button>
        </a>
      </li>
      <li>
        <a href='https://github.com/austincrim/notarize'>
          <Button className='flex items-center w-full' type='dark'>
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
      <li>
        <Button className='w-full'>Sign In</Button>
      </li>
    </ul>
  );
}
