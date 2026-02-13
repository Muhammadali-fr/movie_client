"use server"

type actionState = {
    ok: boolean;
    message: string;
    fieldErrors?: Record<string, string[]>;
}

export async function SetUserAction(prevState: actionState | undefined, formData: FormData) {
    

    return {
        ok: true,
        message: "good",
        fieldErrors: {}
    };
};