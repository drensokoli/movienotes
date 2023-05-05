import React, { useState } from 'react';
import { signIn, useSession, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';

export default function Profile() {
    const { data: session, status } = useSession();
    const [notionApiKey, setNotionApiKey] = useState('');
    const [notionDatabaseId, setNotionDatabaseId] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [moviesPageLink, setMoviesPageLink] = useState('');
    const [tvShowsPageLink, setTvShowsPageLink] = useState('');
    const [booksPageLink, setBooksPageLink] = useState('');

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    var picture = session?.user?.image;
    const router = useRouter();

    const back = () => {
        router.push('/');
    }
    async function handleSubmit() {
        // e.preventDefault();

        const response = await fetch('/api/updateProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: session?.user?.email,
                updatedProfile: {
                    // The updated profile data goes here
                },
            }),
        });

        if (response.ok) {
            // Handle successful profile update
        } else {
            // Handle error updating profile
        }
    }


    return (
        <>
            <div className="antialiased mt-24 flex justify-center items-center">
                <div className="container">
                    <div className="bg-white relative w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto rounded-md drop-shadow-[0_0_10px_rgba(0,0,0,0.2)]">
                        <div className="flex justify-center">
                            <Image src={session?.user?.image?.toString()!} alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-2xl border-4 border-white transition duration-200 transform hover:scale-110 " width={50} height={50} />
                        </div>

                        <div className="mt-16">
                            <h1 className="font-bold text-center text-3xl text-gray-900">{session?.user?.name}</h1>
                            <div className="w-full">
                                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm pb-4">
                                    <form onSubmit={handleSubmit} className='w-full pl-2 pr-2'>
                                        <div className='mb-4 border-b-2 border-gray pb-6 pl-6 pr-6'>
                                            <label className="block mb-2 text-sm text-gray-500">API Key</label>
                                            <input
                                                type="text"
                                                value={notionApiKey}
                                                onChange={(e) => setNotionApiKey(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="Enter your Notion API Key"
                                            />
                                        </div>
                                        <div className='mb-4 pl-6 pr-6'>
                                            <label className="block mb-2 text-sm text-gray-500">Movies Page link</label>
                                            <input
                                                type="text"
                                                // value={notionApiKey}
                                                // onChange={(e) => setNotionApiKey(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="Enter your Movies Page link"
                                            />
                                        </div>
                                        <div className='mb-4 pl-6 pr-6'>
                                            <label className="block mb-2 text-sm text-gray-500">TV Shows Page link</label>
                                            <input
                                                type="text"
                                                // value={notionApiKey}
                                                // onChange={(e) => setNotionApiKey(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="Enter your TV Shows Page link"
                                            />
                                        </div>
                                        <div className='mb-4 pl-6 pr-6'>
                                            <label className="block mb-2 text-sm text-gray-500">Books Page link</label>
                                            <input
                                                type="text"
                                                // value={notionApiKey}
                                                // onChange={(e) => setNotionApiKey(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                                                placeholder="Enter your Books Page link"
                                            />
                                        </div>
                                        <div className='flex justify-center px-6 pt-6'>
                                            <button onClick={handleSubmit} type="button" className="w-full text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}


export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};