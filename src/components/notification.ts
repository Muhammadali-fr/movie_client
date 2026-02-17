import toast, { type ToastOptions } from "react-hot-toast";

const options: ToastOptions = {
    position: "top-center",
    style: {
        background: "#333",
        borderRadius: "8px",
        padding: "6px 8px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 500,
    },
};

export const notification = (msg: string = "Bildirishnoma") => {
    toast(`${msg}!`, options);
};

notification.success = (msg = "Muvaffaqiyatli") => {
    toast.success(msg + "!", options);
};

notification.error = (msg = "Xatolik") => {
    toast.error(msg + "!", options);
};

notification.promise = (
    action,
    msg = {
        loading: "Yuklanmoqda...",
        success: "Muvaffaqiyatli!",
        error: "Xatolik!",
    }
) => {
    toast.promise(action, msg, options);
};
