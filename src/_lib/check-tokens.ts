"use server";

import { cookies } from "next/headers";

export async function checkTokens() {
    const store = await cookies();

    const accessToken = store.get("accessToken")?.value;
    const refreshToken = store.get("refreshToken")?.value;

    if (!refreshToken) return null;

    const parts: string[] = [];

    if (accessToken) {
        parts.push(`accessToken=${encodeURIComponent(accessToken)}`);
    }

    parts.push(`refreshToken=${encodeURIComponent(refreshToken)}`);

    return parts.join("; ");
}
