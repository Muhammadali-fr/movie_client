import { cookies } from "next/headers";
import { IUser } from "../../interfaces/user";
import StoreUserQuery from "./StoreUserQuery";
import { redirect } from "next/navigation";

export default async function StoreUser() {

    console.log("|loading...")
    const cookieHeader = (await cookies()).getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
    const data = await fetch(`http://localhost:8000/auth/profile`, {
        headers: { cookie: cookieHeader },
        method: 'GET',
        credentials: 'include',
    });

    console.log("loading endded")

    if (!data.ok || data.status === 401 || data.status === 403 || data.status === 404) {
        redirect('/auth/sign-in');
    };

    const user: IUser = await data.json();
    return <StoreUserQuery user={user} />;
};