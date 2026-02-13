import Image from "next/image";
import { getMovies } from "@/src/api/services/movie";
import { dataMovies } from "@/src/data/data";
import { IMovie } from "@/src/interfaces/movie";

export default async function Movies() {
    let movies: IMovie[] = [];

    try {
        const res = await getMovies();
        movies = Array.isArray(res) ? res : [];
    } catch {
        movies = [];
    }

    const list = movies.length > 0 ? movies : dataMovies;

    return (
        <section className="w-full">
            <div className="flex items-end justify-between gap-3">
                {movies.length > 0 &&
                    <h2 className="text-3xl font-semibold">
                        Your Favourite Movies
                    </h2>
                }

                {movies.length > 0 ?
                    <p className="text-sm text-gray-500">
                        `${movies.length} saved`
                    </p>
                    :
                    <p className="text-2xl font-semibold">
                        Showing defaults
                    </p>
                }
            </div>

            <div className="mt-6 grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((movie, idx) => (
                    <article
                        key={movie.id ?? `${movie.title}-${idx}`}
                        className="group overflow-hidden rounded-2xl border border-gray-100"
                    >
                        <div className="relative aspect-2/3 w-full bg-gray-100">
                            <Image
                                src={movie.moviePoster}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                priority={idx < 2}
                            />
                        </div>

                        <div className="p-3">
                            <p className="line-clamp-1 text-base font-semibold">
                                {movie.title}
                            </p>

                            {movie.createdAt && (
                                <p className="mt-1 text-xs text-gray-500">
                                    Added{" "}
                                    {new Date(movie.createdAt).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })}
                                </p>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {movies.length === 0 && (
                <p className="mt-4 text-sm text-gray-500">
                    No movies found yet — showing sample movies.
                </p>
            )}
        </section>
    );
}
