"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/user.store";
import type { IUser } from "../../interfaces/user";

export default function StoreUserQuery({ user }: { user: IUser | null }) {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    setUser(user);
    if(!user?.username){
      router.push("/onboarding/set-username")
    }
  }, [user, setUser]);

  return null;
}
