import * as React from 'react';
import Button from './Button';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function NavItems({ selectedNote }) {
    const [session] = useSession();
    return (
        <ul className='flex flex-col space-y-8 text-center'>
            {!session ? (
                <li>
                    <Button
                        type='dark'
                        onClick={() => {
                            signIn('github');
                        }}
                        className='flex items-center w-full'
                    >
                        <Image
                            width='32'
                            height='32'
                            alt='github logo'
                            src='/images/github-logo-light.png'
                        />
                        <span className='ml-2'>Log in with GitHub</span>
                    </Button>
                </li>
            ) : (
                <li>
                    {session ? (
                        <div className='flex-col items-center justify-center space-y-6'>
                            <div className='lg:flex lg:items-center lg:space-x-4'>
                                <Image
                                    className='rounded-full'
                                    width='60'
                                    height='60'
                                    src={session.user.image}
                                />
                                <div className='mt-1 text-xl text-gray-700'>
                                    {session.user.name}
                                </div>
                            </div>
                            <div>
                                <hr />
                            </div>
                        </div>
                    ) : (
                        <React.Fragment />
                    )}
                    <Button
                        type='danger'
                        className='w-full mt-8'
                        onClick={() => signOut()}
                    >
                        Log Out
                    </Button>
                </li>
            )}
            <li>
                <a
                    download={selectedNote?.title}
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        selectedNote?.content
                    )}`}
                >
                    <Button className='w-full'>Download Note</Button>
                </a>
            </li>
            <li>
                <a href='https://github.com/austincrim/notarize-react'>
                    <Button className='w-full'>View Source</Button>
                </a>
            </li>
        </ul>
    );
}
