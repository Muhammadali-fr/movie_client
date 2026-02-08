"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/user.store";
import type { IUser } from "../../interfaces/user";

export default function StoreUserQuery({ user }: { user: IUser | null }) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/sign-in");
      return;
    }
    setUser(user);
  }, [user, router, setUser]);

  return null;
}
