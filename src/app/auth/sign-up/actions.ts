"use server"

import { SignupFormSchema } from "@/src/_lib/definitions"
import { signUp } from "@/src/api/services/auth";

type actionState = {
    ok: boolean;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export async function signup(prevState: actionState | undefined, formData: FormData) {
    const validationResult = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
    });

    if (!validationResult.success) {
        return {
            ok: false,
            message: "Validation errors occurred.",
            fieldErrors: validationResult.error.flatten().fieldErrors,
        };
    };

    const { name, email } = validationResult.data;

    try {
        await signUp({ name, email });
        return {
            ok: true,
            message: "Link sent! Please check your email to complete the sign-up process.",
        };

    } catch (error: any) {
        return {
            ok: false,
            message: error?.message || "Failed to sign up.",
        };
    }
};