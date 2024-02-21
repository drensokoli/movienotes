
import Image from 'next/dist/client/image';
import Link from 'next/link';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ListsCard({ id, title, poster_path, release_date, link, handleStatusChange, statusList, status, trailer, overview, rating, watch_link }: {
    id: number | string;
    title: string;
    poster_path: string | null | undefined;
    release_date: string;
    link: string;
    handleStatusChange: any;
    statusList: any;
    status: string;
    trailer: string;
    overview: any;
    rating: number;
    watch_link: string;
}) {
    const [open, setOpen] = useState(false);

    const cancelButtonRef = useRef(null);

    return (
        <div key={id} className="movie-card sm:w-[200px]" >
            <div className="movie-card-image-container">
                <div className='movie-image'>
                    {poster_path ? (
                        <div
                            onClick={() => setOpen(true)}
                            aria-label={`${title} ${release_date}`}>
                            <Image
                                src={poster_path}
                                width={200}
                                height={300}
                                alt={title}
                                className="rounded-sm max-h-[240px] min-h-[240px] sm:max-h-[300px] sm:min-h-[300px] h-auto select-none object-cover"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <Image
                            src="/no-image.png"
                            width={200}
                            height={300}
                            alt={title}
                            className="rounded-sm h-auto select-none"
                            loading="lazy"
                        />
                    )}
                    <select
                        className="movie-card-button select-none border-2 text-white bg-red-600 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                    // value={status}
                    // onChange={(e) => handleStatusChange(e, id)}
                    >
                        {statusList.map((status: any) => (
                            <option key={status} value={status} className='bg-gray-100 text-gray-800 '>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <Link href={link} passHref target='_blank' aria-label={`${title} ${release_date}`}> */}
                <h2 className="font-bold text-center text-gray-800 hover:text-blue-800 hover:underline transition-colors duration-200 mt-1"
                    onClick={() => setOpen(true)}
                >
                    <span>{title} {release_date ? ` (${release_date.split('-')[0]})` : ''}</span>
                </h2>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <Link href="youtube.com">
                                                    <Image src="/affiliate-white-sm.png" width={100} height={100} alt={''} />
                                                </Link>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    <div className="">
                                                        {title} {release_date ? ` (${release_date.split('-')[0]})` : ''}
                                                        {rating && (
                                                            <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800 mx-2">{rating}</p>
                                                        )}
                                                    </div>
                                                </Dialog.Title>
                                                <div className="mt-2 gap-2 flex flex-col">
                                                    <p className="text-sm text-gray-500 text-left">Overview:</p>
                                                    <p className="text-sm text-gray-900 text-left">{overview}</p>
                                                    <p className="text-sm text-gray-500 text-left">Trailer:</p>
                                                    <Link href={trailer} target='_blank' className="text-sm text-blue-500 text-left hover:text-blue-700 hover:underline">{trailer}</Link>
                                                    <p className="text-sm text-gray-500 text-left">Watch:</p>
                                                    <Link href={watch_link} target='_blank' className="text-sm text-blue-500 text-left hover:text-blue-700 hover:underline">{watch_link}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}