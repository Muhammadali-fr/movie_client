import { fetcher } from "../fetcher";

// auth/sign-up 
export function signUp(data: { name: string, email: string }) {
    return fetcher('/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

// auth/sign-in 
export function signIn(data: { email: string }) {
    return fetcher('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

// auth/profile 
export function getProfile() {
    return fetcher('/auth/profile');
};

// auth/verify 
export function verifyToken(data: { token: string }) {
    return fetcher(`/auth/verify?token=${encodeURI(data.token)}`);
};

// auth/verify 
export function logout() {
    return fetcher(`/auth/logout`, {
        method: 'POST',
    });
};