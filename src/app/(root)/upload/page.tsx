"use client";
import Modal from "@/src/components/Modal";
import { CloudUpload } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMovie } from "@/src/api/services/movie";

export default function UploadPage() {
    const [openModal, setOpenModal] = useState(true);
    const router = useRouter();
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!openModal) router.push("/");
    }, [openModal, router]);
    
    const handleUpload = async () => {
        if (thumbnail && title) {
            console.log("Uploading movie:", { title, thumbnail });
            await uploadMovie({ title, thumbnail });
            setOpenModal(false);
        } else {
            alert("Please provide both a title and an image.");
        }
    };

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)} title="Example Modal">
            <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Add new movie</p>
                <label>
                    <p className="text-sm text-gray-500">Upload a movie thumbnail</p>
                    <div className="w-full h-35 border border-gray-300 rounded-4xl flex items-center justify-center">
                        <CloudUpload color="#0087fe" size={40} />
                    </div>
                    <input onChange={(e) => {
                        const file = e.currentTarget.files?.[0] ?? null;
                        setThumbnail(file);
                    }} className="hidden" type="file" />
                </label>
                <label >
                    <p className="text-sm text-gray-500">Movie title</p>
                    <input onChange={(e) => setTitle(e.currentTarget.value)} value={title} className="w-full h-10 border border-gray-300 rounded-4xl px-4 outline-[#0087fe]" type="text" />
                </label>
                <div className="flex gap-2 mt-3">
                    <button onClick={() => setOpenModal(false)} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition">Cancel</button>
                    <button onClick={handleUpload} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] transition">Upload</button>
                </div>
            </div>
        </Modal>
    );
};