import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const SignupFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});


export const SigninFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const UploadMovieSchema = z.object({
    title: z.string().trim().min(2, "Title must be at least 2 characters").max(100, "Title must be at most 100 characters"),
    moviePoster: z
        .instanceof(File, { message: "Movie poster is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only JPG, PNG, or WEBP images are allowed"
        ),
});