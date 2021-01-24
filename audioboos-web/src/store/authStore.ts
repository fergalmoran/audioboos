import { atom } from "recoil";

interface IAuthStore {
    isLoggedIn: boolean;
}
const authStore = atom<IAuthStore>({
    key: "authConfig",
    default: {
        isLoggedIn: false,
    },
});

export default authStore;
