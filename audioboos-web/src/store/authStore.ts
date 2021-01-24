import { atom } from "recoil";

interface IAuthStore {
    token: string;
    isLoggedIn: boolean;
}
const authStore = atom<IAuthStore>({
    key: "authConfig",
    default: {
        token: "",
        isLoggedIn: false,
    },
});

export default authStore;
