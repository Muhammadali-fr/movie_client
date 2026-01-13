import { fetcher } from "../fetcher";

// auth/sign-up 
export function signUp(data: { name: string, email: string }) {
    return fetcher('/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};