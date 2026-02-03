import { fetcher } from "../fetcher";
import { cookies } from "next/headers";

// movie/upload 
export async function uploadMovie(data: { title: string, moviePoster: File }) {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('moviePoster', data.moviePoster);
    const cookieHeader = (await cookies()).getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

    return fetcher('/movie/upload', {
        method: 'POST',
        body: fd,
        headers: { cookie: cookieHeader }
    });
};