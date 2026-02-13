import Modal from "@/src/components/Modal";
import { AtSign } from "lucide-react";
import Image from "next/image";
import PlusCamera from "@/public/assets/camera.png";
import { useActionState, useState } from "react";
import { SetUserAction } from "./setUserAction";


const initialState = {
  ok: false,
  message: "",
  fieldErrors: {} as Record<string, string[]>,
};

export default function SetUsernameModal() {
  const [state, formAction, pending] = useActionState(SetUserAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);


  return (
    <Modal open={true} onClose={() => { }} title="Set username">
      <form action={formAction} className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Finish your profile</p>

        <label>
          <p className="text-sm text-gray-500">Upload avatar</p>
          <div className="mx-auto flex items-center justify-center border border-gray-300 w-25 h-25 rounded-full ">
            <Image className="opacity-50" src={PlusCamera} alt="camera" height={50} width={50} />
          </div>
          <input name="avatar" type="file" className="hidden" />
        </label>

        <label className="mt-3">
          <p className="text-sm text-gray-500">Username (lowercase)</p>

          <div className="w-full h-10 border border-gray-300 rounded-4xl px-3 flex items-center gap-2 outline-[#0087fe] focus-within:outline">
            <AtSign size={16} className="text-gray-400" />
            <input
              name="username"
              placeholder="mukhamadali.001"
              className="w-full bg-transparent outline-none text-sm"
              type="text"
            />
          </div>
        </label>

        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center font-semibold text-lg rounded-4xl bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] disabled:bg-[#A0A0A5] transition"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
