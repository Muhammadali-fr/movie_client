import { cookies } from "next/headers";
import { IUser } from "../../interfaces/user";
import StoreUserQuery from "./StoreUserQuery";

export default async function StoreUser() {
    const all = (await cookies()).getAll();

    const hasAccess = all.some((c) => c.name === "accessToken" && c.value);
    const hasRefresh = all.some((c) => c.name === "refreshToken" && c.value);

    if (!hasAccess && !hasRefresh) {
        return <StoreUserQuery user={null} />;
    }

    const cookieHeader = all.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');

    const data = await fetch(`http://localhost:8000/auth/profile`, {
        headers: { cookie: cookieHeader },
        method: 'GET',
        credentials: 'include',
    });

    if (!data.ok || data.status === 401 || data.status === 403 || data.status === 404) {
        return <StoreUserQuery user={null} />;
    };

    const user: IUser = await data.json();
    return <StoreUserQuery user={user} />;
};