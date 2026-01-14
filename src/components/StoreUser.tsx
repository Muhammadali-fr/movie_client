"use client";

// react and next 
import Image from "next/image";
import { useState, useEffect } from "react";

// services 
import { getProfile } from "../api/services/auth";

// redux 
import { useDispatch } from "react-redux";
import { setUser } from "../lib/features/userSlice";

// assets 
import LogoImage from '@/public/assets/logo.svg';

// tanstack query 
import { useQuery } from "@tanstack/react-query";

export default function StoreUser() {
    // redux 
    const dispatch = useDispatch();

    // states 
    const [accessToken, setAccessToken] = useState<string | null>(null);

    // safely read tokens after mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            setAccessToken(localStorage.getItem("accessToken"));
        }
    }, []);

    const accessQuery = useQuery({
        queryKey: ['user', accessToken],
        queryFn: () => getProfile({ token: accessToken as string }),
        enabled: !!accessToken,
        retry: false
    });

    useEffect(() => {
        if (accessQuery.data) {
            dispatch(setUser(accessQuery.data.user));
        };
    }, [accessQuery.data, dispatch]);

    if (accessQuery.isPending && accessToken) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-between bg-white z-50 py-5">
                <span />
                <Image src={LogoImage} alt="logo" width={120} height={120} className="rounded-full" />
                <p className="text-black">Loading your account...</p>
            </div>
        );
    };

    return null;
};