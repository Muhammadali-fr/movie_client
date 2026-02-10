import { IUser } from "../../interfaces/user";
import StoreUserQuery from "./StoreUserQuery";
import { checkTokens } from "@/src/_lib/check-tokens";

export default async function StoreUser() {
    const cookieHeader = await checkTokens();

    if (!cookieHeader) return <StoreUserQuery user={null} />;

    const data = await fetch(`http://localhost:8000/auth/profile`, {
        headers: { cookie: cookieHeader },
        method: 'GET',
        cache: 'no-store'
    });

    if (!data.ok) return <StoreUserQuery user={null} />;

    const user: IUser = await data.json();
    return <StoreUserQuery user={user} />;
};