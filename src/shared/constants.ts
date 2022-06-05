import type { IconName } from "@fortawesome/fontawesome-svg-core";

// TODO: don't import IconName into type declarations, it lists all icons (long)
export type SocialMedia = Extract<
  IconName,
  "twitter" | "facebook" | "instagram" | "youtube" | "linkedin"
>;

export type SocialMediaMap = { [key in SocialMedia]: string };

export const socialLinks: SocialMediaMap = {
  twitter: "https://twitter.com/FilmByBen",
  facebook: "https://www.facebook.com/FilmByBen",
  instagram: "https://www.instagram.com/filmbybenvi/",
  youtube: "https://www.youtube.com/channel/UCAuSvQIoFnrkxcg1Jg8Zq7A",
  linkedin: "https://www.linkedin.com/in/benjamin-janes-41b71917b/",
};

export const pages = [
  ["Home", "/"],
  ["Showcase", "/showcase"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
