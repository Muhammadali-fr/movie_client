"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<"saving" | "error">("saving");
  const [message, setMessage] = useState("Saving your token…");

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage(decodeURIComponent(error));
      return;
    }

    if (!accessToken) {
      router.replace("/auth/sign-in");
      return;
    }

    try {
      localStorage.setItem("accessToken", accessToken);
      // redirect immediately (no delay)
      router.replace("/");
    } catch (e) {
      setStatus("error");
      setMessage("Could not save token. Please try again.");
    }
  }, [router, searchParams]);

  return (
    <section className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-95 flex flex-col gap-3">
        <div>
          <h1 className="text-4xl font-semibold">
            {status === "saving" ? "Welcome back" : "Something went wrong"}
          </h1>
          <p className="text-sm mt-1 text-gray-600">
            {status === "saving"
              ? "We’re finishing your Google sign-in."
              : "We couldn’t complete the Google sign-in."}
          </p>
        </div>

        <div className="w-full rounded-3xl bg-[#f3f3f3] border border-[#f3f3f3] px-5 py-4 flex items-center gap-3">
          {status === "saving" ? (
            <Spinner />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <span className="text-xl">⚠️</span>
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm text-gray-800 font-medium">{message}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {status === "saving"
                ? "Redirecting you now…"
                : "Go back and try again."}
            </p>
          </div>
        </div>

        {status === "error" && (
          <button
            onClick={() => router.replace("/auth/sign-in")}
            className="w-full h-12 flex items-center justify-center bg-[#007AFF] hover:bg-[#1A8CFF] text-white rounded-3xl cursor-pointer mt-1 transition"
          >
            Back to Sign In
          </button>
        )}
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
    </div>
  );
}
