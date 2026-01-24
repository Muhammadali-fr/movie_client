"use client";
// import Image from "next/image";
import { getProfile } from "../api/services/auth";
// import LogoImage from '@/public/assets/logo.svg';
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/features/user.store";
import { useEffect } from "react";
import { IUser } from "../interfaces/user";

export default function StoreUser() {

    const { user, setUser, loading, setLoading } = useUserStore((state) => state);

    const { data, isPending, isSuccess } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => await getProfile() as { user: IUser },
        retry: false,
        enabled: !user,
    });

    useEffect(() => {
        if (isSuccess && data?.user) {
            setUser(data?.user)
        }
    }, [data, isSuccess, setUser]);

    if (isPending) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
                <span />
                {/* <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full" /> */}
                <p className="text-black">Loading your account...</p>
            </div>
        );
    };

    return null;
};