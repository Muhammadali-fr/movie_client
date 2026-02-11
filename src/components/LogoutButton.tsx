import { logout } from "@/src/api/services/auth";
import Modal from "@/src/components/Modal";
import { useUserStore } from "@/src/store/user.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
    const router = useRouter()
    const { setUser } = useUserStore((s) => s);
    const [openModal, setOpenModal] = useState(false);
    const logoutQuery = useMutation({
        mutationFn: async () => await logout(),
        onSuccess: (data) => {
            // setUser(null)
            router.refresh();
        },
    }); 

    return (
        <>
            <Modal open={openModal} onClose={() => setOpenModal(false)} title="Example Modal">
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Log out?</p>
                    <p>You are about to log out of your account.</p>
                    <button onClick={() => setOpenModal(false)} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-gray-700/10 text-black cursor-pointer hover:bg-gray-700/15 transition">Cancel</button>
                    <button onClick={() => logoutQuery.mutate()} className="w-full h-12 font-semibold text-lg rounded-4xl  bg-[#0087fe] text-white cursor-pointer hover:bg-[#1b90f7] transition">Log out</button>
                </div>
            </Modal>
            <p onClick={() => setOpenModal(true)} className="underline">logout</p>
        </>
    )
}