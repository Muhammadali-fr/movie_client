import { checkTokens } from "@/src/_lib/check-tokens";
import { fetcher } from "../fetcher";
import { IMovie } from "@/src/interfaces/movie";

// movie/upload 
export async function uploadMovie(data: { title: string, moviePoster: File }) {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('moviePoster', data.moviePoster);

    const cookieHeader = await checkTokens();
    if (!cookieHeader) {
        throw new Error('You must be logged in');
    };  

    return fetcher('/movie/upload', {
        method: 'POST',
        body: fd,
        headers: { cookie: cookieHeader }
    });
};

export async function getMovies() {
    const cookieHeader = await checkTokens();
    if (!cookieHeader) {
        return [];
    }

    return fetcher<IMovie[]>('/movie/get', {
        method: 'GET',
        headers: { cookie: cookieHeader },
        cache: "no-store"
    });
};