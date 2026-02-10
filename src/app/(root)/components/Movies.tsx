import { getMovies } from "@/src/api/services/movie";
import Image from "next/image";

export default async function Movies() {
    const movies = await getMovies()

    return (
        <div>
            <p className="text-3xl font-semibold">Your Favourite Movies</p>
            {movies?.map((movie) => (
                <div key={movie.id}>
                    <div>
                        <Image src={movie.moviePoster} alt={movie.title} width={200} height={300} />
                    </div>
                    <div>
                        <p className="text-xl font-medium">{movie.title}</p>
                        <p className="text-sm text-gray-500">Added on: {new Date(movie.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};