"use client";

import Link from "next/link";
import { useUserStore } from "@/src/store/user.store";
import LogoutButton from "@/src/components/LogoutButton";
import SetUsernameModal from "@/src/components/SetUsernameModal";

export default function Header() {
  const { user } = useUserStore((s) => s);
  console.log(user)

  return (
    <header className="w-full h-12 c-gray">
      <div className="c-width h-full flex items-center justify-between">
        <Link href="/upload">upload</Link>

        {user ? (
          <div className="flex gap-5 items-center text-sm">
            <LogoutButton />
            <p className="text-sm">Welcome, {user.name}</p>
            {!user?.username &&
              <SetUsernameModal />
            }
          </div>
        ) : (
          <Link href="/auth/sign-in">sign-in</Link>
        )}
      </div>
    </header>
  );
}
