import { atom } from "recoil";

interface IAuthStore {
    token?: string;
}
const authStore = atom<IAuthStore>({
    key: "siteConfig",
    default: {},
});

export default authStore;
