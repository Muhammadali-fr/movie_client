"use client"
import Link from "next/link";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useActionState } from "react";
import { signup } from "./actions";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

const initialState = {
    ok: false,
    message: "",
    fieldErrors: {} as Record<string, string[]>,
};

export default function SignUp() {
    const [state, formAction, pending] = useActionState(signup, initialState);

    return (
        <section className="w-full flex items-center justify-center">
            <div className="w-full max-w-95 flex flex-col gap-2">
                <div>
                    <h1 className="text-4xl font-semibold">Welcome</h1>
                    <p className="text-sm mt-1 text-gray-600">Create account for saving your favorite movies.</p>
                </div>

                <GoogleLoginBtn />

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form action={formAction} className="flex flex-col gap-2">
                    <label>
                        <p className="text-sm text-gray-600">Name</p>
                        <input
                            name="name"
                            className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 "
                            type="text"
                            placeholder="John Doe" />
                    </label>

                    {state?.fieldErrors?.name && <p className="text-red-500 text-sm">- {state.fieldErrors.name}</p>}

                    <label className="w-full">
                        <p className="text-sm text-gray-600">Email</p>
                        <input
                            name="email"
                            className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 "
                            type="email"
                            placeholder="youname@exemple.com" />
                    </label>

                    {state?.fieldErrors?.email && <div className="text-red-500 text-sm">{state.fieldErrors.email.map((error, id) => <p key={id}>- {error}</p>)}</div>}

                    {state.message && (
                        <div
                            className={[ "text-sm mt-1",    
                                state.ok ? " text-green-700" : " text-red-700",
                            ].join(" ")}
                        >
                            {state.message}
                        </div>
                    )}

                    <button
                        disabled={pending}
                        type="submit"
                        className="w-full h-12 flex items-center justify-center bg-[#007AFF] hover:bg-[#1A8CFF] disabled:bg-[#A0A0A5] text-white rounded-3xl cursor-pointer mt-2 transition"
                    >
                        {pending ? <ButtonLoader/> : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center">
                    Have an account?{" "}
                    <Link href={"/auth/sign-in"} className="text-blue-700 font-medium cursor-pointer hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </section>
    );
};