export async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
        headers.set("Content-Type", "application/json");
    };


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers,
    });

    if (!res.ok) {
        const contentType = res.headers.get("content-type") || "";
        const errorBody =
            contentType.includes("application/json") ? await res.json().catch(() => null) : await res.text().catch(() => "");
        const msg = (errorBody as any)?.message || (typeof errorBody === "string" && errorBody) || `HTTP Error ${res.status}`;
        throw new Error(msg);
    }

    if (res.status === 204) return undefined as T;

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return (await res.text()) as unknown as T;

    return res.json() as Promise<T>;
};