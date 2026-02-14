import Modal from "@/src/components/Modal";
import { AtSign } from "lucide-react";
import Image from "next/image";
import PlusCamera from "@/public/assets/camera.png";
import { useActionState, useEffect, useMemo, useState } from "react";
import { SetUserAction } from "./setUserAction";
import { useDebouncedCallback } from "use-debounce";
import { checkUsername } from "@/src/api/services/users";
import ButtonLoader from "../loaders/ButtonLoader";
import { Spinner } from "@/components/ui/spinner"

const initialState = {
  ok: false,
  message: "",
  fieldErrors: {} as Record<string, string[]>,
};

export default function SetUsernameModal() {
  const [state, formAction, pending] = useActionState(SetUserAction, initialState);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);


  const checkUsernameHandler = useDebouncedCallback(async (value: string) => {
    setLoading(true);
    try {
      const { available }: any = await checkUsername(value);
      setIsAvailable(Boolean(available));
    } catch {
      setIsAvailable(null);
    } finally {
      setLoading(false);
    }
  }, 800);

  const status = useMemo(() => {
    if (loading) return { text: "Checking username…", cls: "text-gray-500" };
    if (isAvailable === null) return { text: "Username", cls: "text-gray-500" };
    if (isAvailable) return { text: "Username is available", cls: "text-green-600" };
    return { text: "Username is not available", cls: "text-red-600" };
  }, [loading, isAvailable]);

  return (
    <Modal open={true} onClose={() => { }} title="Set username">
      <form action={formAction} className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Finish your profile</p>

        <label>
          <p className="text-sm text-gray-500">Set Profile photo</p>
          <div className="mx-auto flex items-center justify-center border border-gray-400 w-25 h-25 rounded-full ">
            {
              preview ?
                <Image width={150} height={150} src={preview} alt="profile picture" className="w-full h-full object-cover object-center rounded-full" />
                :
                <Image className="opacity-50" src={PlusCamera} alt="camera" height={50} width={50} />
            }
          </div>
          <input onChange={(e) => setPreview(e.target.files ? URL.createObjectURL(e.target.files[0]) : null)} name="avatar" type="file" className="hidden" />
        </label>
        {state?.fieldErrors?.avatar && <div className="text-red-500 text-sm">{state.fieldErrors.avatar.map((error, id) => <p key={id}>- {error}</p>)}</div>}

        <label className="mt-3 space-y-1">
          <p className={`text-sm ${status.cls}`}>{status.text}</p>

          <div className="w-full h-10 border border-gray-300 rounded-4xl px-3 flex items-center gap-2 outline-[#0087fe] focus-within:outline">
            <AtSign size={16} className="text-gray-400" />
            <input
              name="username"
              placeholder="mukhamadali.001"
              className="w-full bg-transparent outline-none text-sm"
              type="text"
              onChange={e => {
                const v = e.target.value.trim();
                setIsAvailable(null);
                if (v.length < 1) return;
                checkUsernameHandler(v);
              }}
            />

            {loading && <Spinner />}
          </div>
        </label>

        {state?.fieldErrors?.username && <div className="text-red-500 text-sm">{state.fieldErrors.username.map((error, id) => <p key={id}>- {error}</p>)}</div>}

        {state.message && (
          <div
            className={["text-sm mt-1",
              state.ok ? " text-green-700" : " text-red-700",
            ].join(" ")}
          >
            {state.message}
          </div>
        )}

        <button
          disabled={!isAvailable === true || pending}
          type="submit"
          className="w-full h-10 flex items-center justify-center font-semibold text-lg rounded-4xl bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] disabled:bg-[#A0A0A5] transition"
        >
          {pending ? <Spinner /> : "Save"}
        </button>
      </form>
    </Modal>
  );
}
