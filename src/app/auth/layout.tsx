"use client"

// next
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

// Toaster 
import { notification } from "@/src/components/notification";

// images 
import arrowRightIcon from "@/public/images/icons/solid-arrow-right.svg";
import authBg from "@/public/assets/auth-bg2.webp";

// Components 
import Icon from "@/src/components/Icon";

// Zustand
import { useUserStore } from "@/src/store/user.store";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useUserStore(s => s);
    const pathname = usePathname();

    useEffect(() => {
        if (user) {
            router.push('/')
            notification("Siz allaqachon ro'yxatdan o'tgansiz");
        }
    }, [user, pathname])

    return (
        <div className="flex items-center justify-center fixed inset-0 size-full xs:bg-gray-light py-3.5 xs:py-4 sm:py-5">
            <div className="container max-h-168 h-full">
                <div className="grid grid-cols-1 relative h-full rounded-3xl md:grid-cols-2">
                    {/* Image */}
                    <div className="hidden max-h-full h-full min-h-0 md:block">
                        <Image
                            width={620}
                            height={672}
                            src={authBg}
                            alt="Furniture background image"
                            className="w-full h-full object-cover rounded-l-3xl"
                        />
                    </div>

                    {/* Back to home */}
                    <Link
                        href="/"
                        title="Back to Home"
                        aria-label="Back to Home"
                        className="hidden btn absolute left-6 top-6 bg-white/50 backdrop-blur p-2 md:flex"
                    >
                        <Icon
                            alt="Arrow right"
                            src={arrowRightIcon}
                            className="size-6 rotate-180"
                        />
                    </Link>

                    {/* Pages */}
                    <div className="size-full max-h-full overflow-y-auto scroll-hidden bg-white px-0 xs:rounded-2xl xs:px-3.5 sm:px-5 md:rounded-none md:rounded-r-3xl">
                        {children}                        
                    </div>
                </div>
            </div>
        </div>
    );
};