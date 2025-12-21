
// next 
import Image from "next/image";
import Link from "next/link";

// assets 
import githubLogo from '@/public/assets/github.webp';
import googleLogo from '@/public/assets/google.webp';

export default function SignUp() {
    return (
        <section className="w-full flex items-center justify-center">
            <div className="w-full max-w-95 flex flex-col gap-2">
                <div>
                    <h1 className="text-4xl font-semibold">Welcome</h1>
                    <p className="text-sm mt-1 text-gray-600">Create account for saving favorite movies.</p>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <button className="w-full h-12 bg-[#f3f3f3] hover:bg-gray-200 flex items-center justify-center gap-2 rounded-3xl cursor-pointer">
                        <Image className="w-7 h-7" src={googleLogo} alt="Google icon" />
                        Sign up with Google
                    </button>

                    <button className="w-full h-12 bg-[#f3f3f3] hover:bg-gray-200 flex items-center justify-center gap-2 rounded-3xl cursor-pointer">
                        <Image className="w-7 h-7" src={githubLogo} alt="GitHub icon" />
                        Sign up with GitHub
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <form className="flex flex-col gap-2">
                    <label>
                        <p className="text-sm text-gray-600">Name</p>
                        <input className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 " type="text" required placeholder="John Doe" />
                    </label>

                    <label className="w-full">
                        <p className="text-sm text-gray-600">Email</p>
                        <input className="w-full h-12 rounded-3xl bg-[#f3f3f3] border-[#f3f3f3] outline-0 px-5 " type="email" required placeholder="youname@exemple.com" />
                    </label>

                    <button className="w-full h-12 border-3xl bg-[#007AFF] hover:bg-[#1A8CFF] disabled:bg-[#A0A0A5] text-white rounded-3xl cursor-pointer mt-2">Sign Up</button>
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