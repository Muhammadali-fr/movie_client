import { fetcher } from "../fetcher";

// movie/upload 
export async function uploadMovie(data: { title: string, thumbnail: File }) {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('thumbnail', data.thumbnail);
    
    return fetcher('/movie/upload', {
        method: 'POST',
        body: fd,
    });
}