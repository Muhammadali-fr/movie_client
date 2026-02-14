import { fetcher } from "../fetcher";

export async function checkUsername(value: string) {
    if (!value) return;
    return fetcher(`/users/username-available?u=${value}`);
};