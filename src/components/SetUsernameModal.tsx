import Modal from "@/src/components/Modal";
import { CloudUpload, X, AtSign, UserRound } from "lucide-react";
import Image from "next/image";

export default function SetUsernameModal() {
  return (
    <Modal open={true} onClose={() => {}} title="Set username">
      <div className="flex flex-col gap-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">Finish your profile</p>
        </div>
        
        {/* Avatar Upload (Design Only) */}
        <div className="mt-3">
          <p className="text-sm text-gray-500">Upload avatar (optional)</p>

          {/* Empty state */}
          <div className="w-full h-35 border border-gray-300 rounded-4xl flex items-center justify-center">
            <CloudUpload color="#0087fe" size={40} />
          </div>

          {/* Preview state (comment out the empty state above if you want to show this) */}
          {/*
          <div className="border-2 border-gray-300 rounded-4xl overflow-hidden relative">
            <Image
              className="w-full h-35 border border-gray-300 object-cover"
              src="/avatar-preview.webp"
              width={500}
              height={500}
              alt="avatar"
            />
            <div className="absolute top-3 right-3 bg-red-500 hover:bg-red-300 rounded-full p-1 cursor-pointer">
              <X className="text-white" size={16} />
            </div>
          </div>
          */}
        </div>

        {/* Username (Design Only) */}
        <div className="mt-3">
          <p className="text-sm text-gray-500">Username (lowercase)</p>

          <div className="w-full h-10 border border-gray-300 rounded-4xl px-4 flex items-center gap-2 outline-[#0087fe] focus-within:outline focus-within:outline-2">
            <AtSign size={16} className="text-gray-400" />
            <input
              name="username"
              placeholder="muhammadali_07"
              className="w-full bg-transparent outline-none text-sm"
              type="text"
            />
          </div>

          <p className="text-xs text-gray-400 mt-1">
            Use a-z, 0-9, . and _ (3–30 chars)
          </p>

          {/* Availability hint (design only) */}
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Checking…</span>
            {/* <span className="text-green-600">Available ✅</span> */}
            {/* <span className="text-red-600">Taken ❌</span> */}
          </div>
        </div>

        {/* Error block (Design Only) */}
        <div className="hidden text-red-500 text-sm mt-2">
          <p>- Username is taken</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            className="w-full h-12 font-semibold text-lg rounded-4xl bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            className="w-full h-12 flex items-center justify-center font-semibold text-lg rounded-4xl bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] disabled:bg-[#A0A0A5] transition"
            disabled
          >
            Save
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-3">
          Your profile link will look like{" "}
          <span className="text-gray-600 font-medium">/u/username</span>
        </p>
      </div>
    </Modal>
  );
}
