"use client";
import Modal from "@/src/components/Modal";
import { useState } from "react";

export default function UploadPage() {
    const [openModal, setOpenModal] = useState(true);

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)} title="Example Modal">
            <div className="space-y-2">
                <p className="text-lg font-semibold">Add new movie</p>
                <label>
                    <p className="text-sm text-gray-500">Upload a movie thumbnail</p>
                    <div className="w-full h-35 border border-[#0087fe] rounded-4xl"></div>
                    <input className="hidden" type="file" />
                </label>
                <div className="flex gap-2 mt-2">
                    <button onClick={() => setOpenModal(false)} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition">Cancel</button>
                    <button className="w-full h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] transition">Upload</button>
                </div>
            </div>
        </Modal>
    );
};