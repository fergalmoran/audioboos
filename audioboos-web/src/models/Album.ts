import { Track } from ".";

export interface Album {
  id: number;
  albumName: string;
  tracks?: Track[];
}