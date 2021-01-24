import ApiService from "./apiService";
import { Artist, Album } from "../../models";

class AudioBoosService extends ApiService {
  getArtists = async (): Promise<Artist[] | undefined> => {
    const client = await this.requestClient();

    try {
      const response = await client.get("/artists", {
          withCredentials: true,
          credentials: "include",
          crossDomain: true,
      });
      if (response && response.status === 200) {
        return response.data as Artist[];
      }
    } catch (err) {
      console.error("Exception fetching settings", err);
      throw err;
    }
  };
  getAlbums = async (artistName: string): Promise<Album[] | undefined> => {
    const client = await this.requestClient();

    try {
      const response = await client.get(`albums/${artistName}`);
      if (response && response.status === 200) {
        return response.data as Album[];
      }
    } catch (err) {
      console.error("Exception fetching settings", err);
      throw err;
    }
  };
  getAlbum = async (
    artistName: string,
    albumName: string
  ): Promise<Album | undefined> => {
    const client = await this.requestClient();

    try {
      const response = await client.get(`albums/${artistName}/${albumName}`);
      if (response && response.status === 200) {
        return response.data as Album;
      }
    } catch (err) {
      console.error("Exception fetching settings", err);
      throw err;
    }
  };
}
const audioBoosService = new AudioBoosService();
export default audioBoosService;
