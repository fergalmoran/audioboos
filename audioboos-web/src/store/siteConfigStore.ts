import { atom } from "recoil";
import { Settings } from "../models";

interface ISiteConfigStore {
    theme?: string;
    settings?: Settings;
}
const siteConfigStore = atom<ISiteConfigStore>({
    key: "siteConfig",
    default: {
        theme: "dark",
        settings: {
            siteName: "AudioBoos",
        },
    },
});

export default siteConfigStore;
