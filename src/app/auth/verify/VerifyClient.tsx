"use client";

import { verifyToken } from "@/src/api/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) router.replace("/auth/sign-up"); // replace is better than push here
  }, [token, router]);

  const { isPending, error } = useQuery({
    queryKey: ["access-token", token],
    enabled: !!token,
    queryFn: async () => verifyToken({ token: token as string }),
    retry: false,
  });

  // ✅ redirect after success
  useEffect(() => {
    if (!isPending && !error && token) {
      router.replace("/"); // or wherever you want
    }
  }, [isPending, error, token, router]);

  if (isPending) return null; // suspense fallback already shows UI

  if (error) return <div>error</div>;

  return null;
}
