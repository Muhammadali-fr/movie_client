"use client"

import { useEffect } from "react";
import { IUser } from "../../interfaces/user";
import { useUserStore } from "../../store/user.store";

export default function StoreUserQuery({ user }: { user: IUser }) {
    const { setUser } = useUserStore((state: { setUser: (user: IUser) => void }) => state);

    useEffect(() => {
        if (user) {
            setUser(user)
        };
    }, [user, setUser]);

    console.log("StoreUserQuery rendered with user:", user);
    return null;
};  