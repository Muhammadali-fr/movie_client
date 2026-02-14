import { checkTokens } from "@/src/_lib/check-tokens";
import { fetcher } from "../fetcher";

// /users/username-available
export async function checkUsername(value: string) {
    if (!value) return;
    return fetcher(`/users/username-available?u=${value}`);
};
// /users/set-username 
export async function setUsername(data: { username: string, avatar: File }) {
    const fd = new FormData();
    fd.append('username', data.username);
    fd.append('avatar', data.avatar);

    const cookieHeader = await checkTokens();
    if (!cookieHeader) {
        throw new Error('You must be logged in');
    };

    return fetcher('/users/set-username', {
        method: 'PATCH',
        body: fd,
        headers: { cookie: cookieHeader }
    });
};
