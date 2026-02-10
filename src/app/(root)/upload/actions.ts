"use server";

import { UploadMovieSchema } from "@/src/_lib/definitions";
import { uploadMovie } from "@/src/api/services/movie";

type actionState = {
    ok: boolean;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export async function uploadMoviePoster(prevState: actionState | undefined, formData: FormData) {
    const validationResult = UploadMovieSchema.safeParse({
        title: formData.get("title"),
        moviePoster: formData.get("moviePoster"),
    });

    if (!validationResult.success) {
        return {
            ok: false,
            message: "Validation errors occurred.",
            fieldErrors: validationResult.error.flatten().fieldErrors,
        };
    };

    const { title, moviePoster } = validationResult.data;

    try {
        const res = await uploadMovie({ title, moviePoster });
        return {
            ok: true,
            message: "Movie uploaded successfully.",
        };
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message || "Failed to sign in.",
        };
    };
};
