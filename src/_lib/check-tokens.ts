"use server";
import { cookies } from "next/headers";

export async function checkTokens() {
    const store = await cookies();
    const accessToken = store.get('accessToken');
    const refreshToken = store.get('refreshToken');

    if (!accessToken || !refreshToken) return null;

    return `accessToken=${encodeURIComponent(accessToken.value)}; refreshToken=${encodeURIComponent(refreshToken.value)}`;
};
