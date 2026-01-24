import { IUser } from "@/src/interfaces/user";
import { create } from "zustand";

type IUserStore = {
    user: IUser | null;
    loading: boolean;
    setUser: (user: IUser | null) => void;
    setLoading: (v: boolean) => void;
    logout: () => void;
};

export const useUserStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    loading: false,
    logout: () => set({ user: null, loading: false }),
    setLoading: (loading) => set({loading}),
}));
