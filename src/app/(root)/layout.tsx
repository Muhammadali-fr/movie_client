"use client";   
import { useUserStore } from "@/src/store/user.store";
import Header from "./components/Header";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    const {user} = useUserStore(e => e)
    console.log("user", user)

    return (
        <div>
            <Header />
            {children}
        </div>
    );
};