"use client"
import Link from "next/link";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/src/api/services/auth";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

export default function SignIn() {
    const [serverError, setServerError] = useState<string | null>(null);

    const signInMutation = useMutation({
        mutationFn: async (data: { email: string }) => {
            return await signIn(data);
        },
        onSuccess: (message) => {
            console.log("success message:", message)
        },
        onError: (error) => {
            console.log("error message:", error)
            setServerError(
                error?.message || "Something went wrong. Please try again."
            );
        },
    });

    const form = useForm({
        defaultValues: {
            email: ""
        },
        onSubmit: async ({ value }) => {
            await signInMutation.mutateAsync(value);
        },
    });

    return (
        <section className="w-full flex items-center justify-center">
            <div className="w-full max-w-95 flex flex-col gap-2">
                <div>
                    <h1 className="text-4xl font-semibold">Welcome Back</h1>
                    <p className="text-sm mt-1 text-gray-600">Sign in to your account for saving favorite movies.</p>
                </div>

                <GoogleLoginBtn />

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form onSubmit={
                    (e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }
                } className="flex flex-col gap-2">
                    <form.Field name="email">
                        {(field) => (
                            <label className="w-full">
                                <p className="text-sm text-gray-600">Email</p>
                                <input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 "
                                    type="email"
                                    required
                                    placeholder="youname@exemple.com" />
                            </label>
                        )}
                    </form.Field>

                    {serverError && (
                        <p className="text text-red-600 text-center">
                            {serverError}
                        </p>
                    )}

                    <button
                        disabled={signInMutation.isPending}
                        className="w-full h-12 flex items-center justify-center bg-[#007AFF] hover:bg-[#1A8CFF] disabled:bg-[#A0A0A5] text-white rounded-3xl cursor-pointer mt-2 transition"
                    >
                        {signInMutation.isPending ? <ButtonLoader /> : "Sign In"}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link href={"/auth/sign-up"} className="text-blue-700 font-medium cursor-pointer hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
};