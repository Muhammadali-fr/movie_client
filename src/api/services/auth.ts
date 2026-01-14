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

// auth/sign-up 
export function signIn(data: { email: string }) {
    return fetcher('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// auth/sign-up 
export function getProfile(data: { token: string }) {
    return fetcher('/auth/profile', {
        method: 'POST',
        headers: {
            Authorization:  `Bearer ${data.token}`
        },
    });
};