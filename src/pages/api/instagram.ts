import { URL, URLSearchParams } from "url";

import type { RawInstagramMedia, InstagramMedia } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

const INSTAGRAM_ID = process.env.INSTAGRAM_ID;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

const FB_API_URL = "https://graph.facebook.com/v14.0/";
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 10;

interface Data {
  posts: InstagramMedia[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    query: { limit },
  } = req;

  switch (method) {
    case "GET":
      const url = new URL(`${FB_API_URL}/${INSTAGRAM_ID}/media`);
      const params = new URLSearchParams({
        access_token: FB_ACCESS_TOKEN,
        fields:
          "id,comments_count,like_count,media_type,media_url,permalink,thumbnail_url,timestamp",
        limit: Math.min(
          limit ? parseInt(limit as string) : DEFAULT_LIMIT,
          MAX_LIMIT
        ).toString(),
      });

      url.search = params.toString();

      try {
        const response = await fetch(url);
        const { data } = await response.json();

        const posts: InstagramMedia[] = data.map(
          ({
            media_type,
            media_url,
            thumbnail_url,
            ...rest
          }: RawInstagramMedia) => ({
            ...rest,
            thumbnail_url: media_type === "VIDEO" ? thumbnail_url : media_url,
          })
        );

        res.setHeader(
          "Cache-Control",
          "public, s-maxage=900, stale-while-revalidate=59"
        );
        res.status(200).json({ posts });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).json({ posts: [], error: message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
