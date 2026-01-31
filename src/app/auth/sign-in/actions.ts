"use server"

import { SigninFormSchema } from "@/src/_lib/definitions";
import { signIn } from "@/src/api/services/auth";


type actionState = {
    ok: boolean;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export async function signin(prevState: actionState | undefined, formData: FormData) {
    const validationResult = SigninFormSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validationResult.success) {
        return {
            ok: false,
            message: "Validation errors occurred.",
            fieldErrors: validationResult.error.flatten().fieldErrors,
        };
    };

    const { email } = validationResult.data;

    try {
        await signIn({ email });
        return {
            ok: true,
            message: "Link sent! Please check your email to complete the sign-in process.",
        };
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message || "Failed to sign in.",    
        };
    };
};