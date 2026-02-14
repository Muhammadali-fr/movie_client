import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileOptional = z
    .instanceof(File, { message: "Profile photo is required" })
    .refine((file) => file.size > 0, "Profile photo is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 10MB")
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPG, PNG, or WEBP images are allowed"
    )

const usernameSchema = z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .transform((v) => v.toLowerCase())
    .refine((v) => !/\s/.test(v), "Username cannot contain spaces")
    .refine((v) => /^[a-z0-9._]+$/.test(v), "Only letters, numbers, '.' and '_' are allowed")
    .refine((v) => !/^[._]/.test(v), "Username can't start with '.' or '_'")
    .refine((v) => !/[._]$/.test(v), "Username can't end with '.' or '_'")
    .refine((v) => !/[._]{2,}/.test(v), "No consecutive '.' or '_'")
    .refine((v) => !/(\._|_\.)/.test(v), "Don't mix '.' and '_' next to each other");

export const SignupFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(60, "Name is too long")
        .refine((v) => v.length > 0, "Name is required"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
});

export const SigninFormSchema = z.object({
    email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
});

export const UploadMovieSchema = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Title must be at least 2 characters")
        .max(100, "Title must be at most 100 characters"),
    moviePoster: z
        .instanceof(File, { message: "Movie poster is required" })
        .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 10MB")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only JPG, PNG, or WEBP images are allowed"),
});

export const setUsernameSchema = z.object({
    username: usernameSchema,
    avatar: imageFileOptional,
});
