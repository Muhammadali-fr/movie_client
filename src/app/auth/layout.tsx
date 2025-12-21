// next
import Image from "next/image";

// assets 
import authBg from "@/public/assets/auth-bg2.webp";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex items-center justify-between gap-10">
            <div className="w-3/10 h-screen">
                <Image width={500} height={500} className="w-full h-full object-cover object-center" src={authBg} alt="background-image" placeholder="blur" />
            </div>
            <div className="w-7/10">
                {children}
            </div>
        </div>
    );
};