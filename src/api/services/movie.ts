import { fetcher } from "../fetcher";

// movie/upload 
export async function uploadMovie(data: { title: string, moviePoster: File }) {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('moviePoster', data.moviePoster);
    
    return fetcher('/movie/upload', {
        method: 'POST',
        body: fd,
    });
}