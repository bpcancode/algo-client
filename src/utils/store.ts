import { create } from "zustand";
import { User } from "../models/models";

type LoginStore = {
  isLoggedIn: boolean;
  user: User | null;
  loggedIn: (user: User) => void;
  loggedOut: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  isLoggedIn: false,
  user: null,
  loggedIn: (user: User) => set(() => ({ isLoggedIn: true, user })),
  loggedOut: () => set(() => ({ isLoggedIn: false, user: null })),
}));
