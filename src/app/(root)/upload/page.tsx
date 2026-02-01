"use client";
import Modal from "@/src/components/Modal";
import { CloudUpload } from "lucide-react";
import { uploadMoviePoster } from "./actions";
import { useActionState } from "react";
import ButtonLoader from "@/src/components/loaders/ButtonLoader";

const initialState = {
    ok: false,
    message: "",
    fieldErrors: {} as Record<string, string[]>,
};

export default function UploadPage() {
    const [state, formAction, pending] = useActionState(uploadMoviePoster, initialState);

    return (
        <Modal open={true} onClose={() => alert("Modal closed")} title="Example Modal">
            <form className="flex flex-col gap-1" action={formAction}>
                <p className="text-lg font-semibold">Add new movie</p>
                <label>
                    <p className="text-sm text-gray-500">Upload a movie thumbnail</p>
                    <div className="w-full h-35 border border-gray-300 rounded-4xl flex items-center justify-center">
                        <CloudUpload color="#0087fe" size={40} />
                    </div>
                    <input name="moviePoster" className="hidden" type="file" />
                </label>

                {state?.fieldErrors?.title && <div className="text-red-500 text-sm">{state.fieldErrors.title.map((error, id) => <p key={id}>- {error}</p>)}</div>}

                <label >
                    <p className="text-sm text-gray-500">Movie title</p>
                    <input name="title" className="w-full h-10 border border-gray-300 rounded-4xl px-4 outline-[#0087fe]" type="text" />
                </label>

                {state?.fieldErrors?.moviePoster && <div className="text-red-500 text-sm">{state.fieldErrors.moviePoster.map((error, id) => <p key={id}>- {error}</p>)}</div>}

                {state.message && (
                    <div
                        className={["text-sm mt-1",
                            state.ok ? " text-green-700" : " text-red-700",
                        ].join(" ")}
                    >   
                        {state.message}
                    </div>
                )}

                <div className="flex gap-2 mt-3">
                    <button type="button" className="w-full h-12 font-semibold text-lg rounded-4xl  bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition">Cancel</button>
                    <button
                        disabled={pending}
                        type="submit"
                        className="w-full h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] disabled:bg-[#A0A0A5] transition">
                        {pending ? <ButtonLoader /> : "Upload"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};