
import Link from "next/link";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

export default function SignIn() {
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

                <form className="flex flex-col gap-2">
                    <label className="w-full">
                        <p className="text-sm text-gray-600">Email</p>
                        <input className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 " type="text" placeholder="youname@exemple.com" />
                    </label>

                    <button className="w-full h-12 border-3xl bg-[#007AFF] hover:bg-[#1A8CFF] disabled:bg-[#A0A0A5] text-white rounded-3xl cursor-pointer mt-2">Sign In</button>
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