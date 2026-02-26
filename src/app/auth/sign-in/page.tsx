"use client"
import Link from "next/link";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import { useActionState } from "react";
import { signin } from "./actions";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

const initialState = {
    ok: false,
    message: "",
    fieldErrors: {} as Record<string, string[]>,
};

export default function SignIn() {
    const [state, formAction, pending] = useActionState(signin, initialState);

    return (
        <section className="flex justify-center gap-3.5 size-full">
            <div className="max-w-119 w-full my-auto py-5 space-y-3">
                {/* <div>
                    <p className="text-sm mt-1 text-gray-600">Sign in to your account for saving favorite movies.</p>
                </div> */}

                <h1 className="text-2xl">Akkountga kirish</h1>

                <div>
                    <p className="inline-block">Hali akkauntingiz yo'qmi?</p>
                    <Link href="/auth/sign-up" className="text-primary">
                        {" "}
                        Ro'yxatdan o'tish
                    </Link>
                </div>

                <GoogleLoginBtn />

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form className="flex flex-col gap-2" action={formAction}>
                    <label className="w-full">
                        <p className="text-sm text-gray-600">Email</p>
                        <input
                            name="email"
                            className="w-full h-12 rounded-lg bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 "
                            type="email"
                            placeholder="youname@exemple.com" />
                    </label>

                    {state?.fieldErrors?.email && <div className="text-red-500 text-sm">{state.fieldErrors.email.map((error, id) => <p key={id}>- {error}</p>)}</div>}

                    {state.message && (
                        <div
                            className={["text-sm mt-1",
                                state.ok ? " text-green-700" : " text-red-700",
                            ].join(" ")}
                        >
                            - {state.message}
                        </div>
                    )}

                    <button
                        disabled={pending}
                        type="submit"
                        className="w-full h-12 flex items-center justify-center bg-[#007AFF] hover:bg-[#1A8CFF] disabled:bg-[#A0A0A5] text-white rounded-lg cursor-pointer mt-2 transition"
                    >
                        {pending ? <ButtonLoader /> : "Sign In"}
                    </button>
                </form>

                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href={"/auth/sign-up"} className="text-blue-700 font-medium cursor-pointer hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
};