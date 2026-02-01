"use client";
import { logout } from "@/src/api/services/auth";
import Modal from "@/src/components/Modal";
import { useUserStore } from "@/src/store/user.store";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
    const [openModal, setOpenModal] = useState(false);
    const { setUser } = useUserStore(s => s)
    const logoutQuery = useMutation({
        mutationFn: async () => await logout(),
        onSuccess: (data) => {
            setUser(null)
        }
    })
    return (
        <div className="c-width">
            <Modal open={openModal} onClose={() => setOpenModal(false)} title="Example Modal">
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Log out?</p>
                    <p>You are about to log out of your account.</p>
                    <button onClick={() => setOpenModal(false)} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition">Cancel</button>
                    <button onClick={() => logoutQuery.mutate()} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] transition">Log out</button>
                </div>
            </Modal>
            <Image unoptimized  src="https://round-482885090933.s3.eu-north-1.amazonaws.com/f10f3f2a-7f77-47fd-8a53-8494bf348124.webp" alt="Logo" width={150} height={150} />
            <button onClick={() => setOpenModal(true)} className="w-75 h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] transition">open modal</button>
        </div>
    );
}