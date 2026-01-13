"use client";

import Image from "next/image";
import googleLogo from "@/public/assets/google.webp";

export default function GoogleLoginBtn() {
  function handleLoginwithGoogle() {
    const width = 500;
    const height = 500;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      "http://localhost:8000/auth/google",
      "google_oauth",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      alert("Popup blocked. Please allow popups for this site.");
      return;
    }

    popup.focus();
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        type="button"
        onClick={handleLoginwithGoogle}
        className="w-full h-12 bg-[#f3f3f3] hover:bg-gray-200 flex items-center justify-center gap-2 rounded-3xl cursor-pointer"
      >
        <Image className="w-7 h-7" src={googleLogo} alt="Google icon" />
        Sign in with Google
      </button>
    </div>
  );
}
