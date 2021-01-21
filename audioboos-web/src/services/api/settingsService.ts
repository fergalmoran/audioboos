import { Settings } from "../../models";
import ApiService from "./apiService";

class SettingsService extends ApiService {
  getSettings = async (): Promise<Settings | undefined> => {
    const client = await this.requestClient();

    try {
      const response = await client.get("/settings");
      if (response && response.status === 200) {
        return response.data as Settings;
      }
    } catch (err) {
      console.error("Exception fetching settings", err);
      throw err;
    }
  };
}
export default SettingsService;
