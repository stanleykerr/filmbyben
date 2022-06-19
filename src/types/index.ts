export * from "./layout";

export interface IUser {
  id: string;
}

export interface RawInstagramMedia {
  id: string;
  comments_count: number;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

export type InstagramMedia = Omit<
  RawInstagramMedia,
  "media_type" | "media_url" | "thumbnail_url"
> & {
  thumbnail_url: string;
};
