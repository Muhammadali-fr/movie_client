import { cookies } from "next/headers";
import { IUser } from "../../interfaces/user";
import StoreUserQuery from "./StoreUserQuery";

export default async function StoreUser() {

    const cookieHeader = (await cookies()).getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
    const user = await fetch(`http://localhost:8000/auth/profile`, {
        headers: { cookie: cookieHeader },
        method: 'GET',
        credentials: 'include',
    }).then((res) => res.json())

    return <StoreUserQuery user={user} />;
};