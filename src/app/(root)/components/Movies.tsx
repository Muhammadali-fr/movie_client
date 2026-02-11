import { getMovies } from "@/src/api/services/movie";
import Image from "next/image";

export default async function Movies() {
    const movies = await getMovies()
    await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <div>
            <p className="text-3xl font-semibold">Your Favourite Movies</p>
            <div className="w-full grid grid-cols-2 gap-5">
                {movies?.map((movie) => (
                    <div className="w-full" key={movie.id}>
                        <Image className="w-full" src={movie.moviePoster} alt={movie.title} width={200} height={300} />
                        <div>
                            <p className="text-xl font-medium">{movie.title}</p>
                            <p className="text-sm text-gray-500">Added on: {new Date(movie.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};