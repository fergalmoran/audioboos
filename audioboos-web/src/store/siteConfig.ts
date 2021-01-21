import { atom } from "recoil";
import { Settings } from "../models";

interface ISiteConfig {
  theme?: string;
  settings?: Settings;
}
const siteConfig = atom<ISiteConfig>({
  key: "siteConfig",
  default: {
    theme: "dark",
    settings: {
      siteName: "AudioBoos",
    },
  },
});

export default siteConfig;
