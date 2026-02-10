"use client";

import Link from "next/link";
import { useUserStore } from "@/src/store/user.store";

export default function Header() {
  const user = useUserStore((s) => s.user);

  return (
    <header className="w-full h-12 c-gray">
      <div className="c-width h-full flex items-center justify-between">
        <Link href="/upload">upload</Link>

        {user ? (
          <p className="text-sm">Welcome, {user.name}</p>
        ) : (
          <Link href="/auth/sign-in">sign-in</Link>
        )}
      </div>
    </header>
  );
}
