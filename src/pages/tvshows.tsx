import { useEffect, useState } from 'react';
import axios from 'axios';
import TvShow from '../components/Media/TvShow';
import SearchBar from '@/components/Layout/SearchBar';
import NotionAd from '@/components/Notion/NotionAd';
import NotionResponse from '@/components/Notion/NotionResponse';
import { useSession } from 'next-auth/react';
import { searchTvShowByTitle } from '@/lib/tvShowHelpers';
import { TvShow as TvShowInterface } from '@/lib/interfaces';
import Head from 'next/head';

export default function TvShows({ tmdbApiKey, cryptoKey, popularTvShows }: {
    tmdbApiKey: string;
    cryptoKey: string;
    popularTvShows: TvShowInterface[];
}) {

    const { data: session } = useSession();

    const [input, setInput] = useState('');
    const [tvShows, setTvShows] = useState<TvShowInterface[]>([]);
    const [notionApiKey, setNotionApiKey] = useState<string>('');
    const [tvShowsPageLink, setTvShowPageLink] = useState<string>('');
    const [apiResponse, setApiResponse] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
        searchTvShowByTitle({ title: event.target.value, tmdbApiKey: tmdbApiKey })
            .then(movies => {
                if (movies) {
                    setTvShows(movies);
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        if (session) {
            const fetchUser = async () => {
                const response = await fetch('/api/getUser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userEmail: session?.user?.email }),
                });
                const user = await response.json();
                setNotionApiKey(user.notionApiKey);
                setTvShowPageLink(user.tvShowsPageLink);
            };
            fetchUser();
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>ClickNotes - TV Shows</title>
                <meta name="description" content="Save popular and trending TV shows to your Notion list or search for your favourites. All your TV shows in one place, displayed in a beautiful Notion template." />
                <meta name="robots" content="all"></meta>
                <meta property="og:title" content="ClickNotes - TV Shows" />
                <meta property="og:description" content="Save popular and trending TV shows to your Notion list or search for your favorites. All your TV shows in one place, displayed in a beautiful Notion template." />
                <meta property="og:image" content="https://www.clicknotes.site/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="Dren Sokoli" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <NotionResponse apiResponse={apiResponse} setApiResponse={setApiResponse} />
            <div className="flex flex-col items-center min-h-screen bg-white space-y-4">
                <SearchBar input={input} handleInputChange={handleInputChange} />
                <div className="content-container w-5/6">
                    <NotionAd path={"tvshows"} />
                    <div className="movie-container">
                        {tvShows
                            .map((item) => (
                                <TvShow
                                    {...item}
                                    key={item.id}
                                    first_air_date={''}
                                    backdrop_path={''}
                                    onApiResponse={(error: string) => setApiResponse(error)}
                                    cryptoKey={cryptoKey}
                                    tmdbApiKey={tmdbApiKey}
                                    notionApiKey={notionApiKey}
                                    tvShowsPageLink={tvShowsPageLink}
                                />
                            ))}
                    </div>
                    {tvShows.length === 0 && (
                        <>
                            <div className="movie-container">
                                {popularTvShows.map((item) => (
                                    <TvShow
                                        {...item}
                                        key={item.id}
                                        first_air_date={''}
                                        backdrop_path={''}
                                        onApiResponse={(error: string) => setApiResponse(error)}
                                        cryptoKey={cryptoKey}
                                        tmdbApiKey={tmdbApiKey}
                                        notionApiKey={notionApiKey}
                                        tvShowsPageLink={tvShowsPageLink}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );

};

export const getStaticProps = async () => {

    const cryptoKey = process.env.CRYPTO_KEY;
    const tmdbApiKey = process.env.TMDB_API_KEY;

    const popularTvShowsResponsePageOne = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbApiKey}&language=en-US&page=1`);
    const popularTvShowsResponsePageTwo = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbApiKey}&language=en-US&page=2`);
    const popularTvShowsResponsePageThree = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbApiKey}&language=en-US&page=3`);
    const popularTvShowsResponsePageFour = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbApiKey}&language=en-US&page=4`);

    const popularTvShowsResponse = {
        data: {
            results: [
                ...popularTvShowsResponsePageOne.data.results,
                // ...popularTvShowsResponsePageTwo.data.results,
                // ...popularTvShowsResponsePageThree.data.results,
                // ...popularTvShowsResponsePageFour.data.results
            ]
        }
    };

    const popularTvShows = popularTvShowsResponse.data.results;

    return {
        props: {
            tmdbApiKey,
            cryptoKey,
            popularTvShows
        },

        revalidate: 60 * 60 * 24 // 24 hours
    };

}
