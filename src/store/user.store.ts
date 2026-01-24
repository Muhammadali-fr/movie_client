import { IUser } from "@/src/interfaces/user";
import { create } from "zustand";

type IUserStore = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    logout: () => void;
};

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
