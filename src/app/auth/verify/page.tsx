"use client"
import { verifyToken } from "@/src/api/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            router.push("/auth/sign-up");
        };
    }, [token, router])

    const { data, isPending, error } = useQuery({
        queryKey: ["access-token", token],
        enabled: !!token,
        queryFn: async () => {
            return await verifyToken({ token: token as string });
        },
    });

    console.log("data:", data)

    if (isPending) {

        return (
            <section className="w-full min-h-[60vh] flex items-center justify-center px-4">
                <div className="w-full max-w-95 flex flex-col">
                    <h1 className="text-[44px] leading-none font-bold text-gray-900">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        We’re finishing your Email sign-in.
                    </p>

                    <div className="mt-6 rounded-[28px] bg-[#f3f3f3] border border-[#f3f3f3] px-6 py-5 flex items-center gap-4">
                        {/* Spinner */}
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-gray-500 animate-spin" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                                Verifying your account...
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Redirecting you now…
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    if (error) {
        console.log(error);
        return (
            <div>error</div>
        );
    };
};
