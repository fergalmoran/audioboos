import { Track } from ".";

export interface Album {
  id: number;
  albumName: string;
  description: string;
  largeImage: string;
  smallImage: string;
  tracks?: Track[];
}
