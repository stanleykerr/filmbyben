import type { IconName } from "@fortawesome/fontawesome-svg-core";

export type SocialMedia = Extract<
  IconName,
  "twitter" | "facebook" | "instagram" | "youtube" | "linkedin" | "tiktok"
>;

export type SocialMediaMap = { [key in SocialMedia]: string };

export const socialLinks: SocialMediaMap = {
  twitter: "https://twitter.com/FilmByBen",
  facebook: "https://www.facebook.com/FilmByBen",
  instagram: "https://www.instagram.com/filmbybenvi/",
  youtube: "https://www.youtube.com/channel/UCAuSvQIoFnrkxcg1Jg8Zq7A",
  linkedin: "https://www.linkedin.com/in/benjamin-janes-41b71917b/",
  tiktok: "https://www.tiktok.com/@filmbybenvi",
};

export const pages = [
  ["Home", "/"],
  ["Showcase", "/showcase"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export const cmsPages = [
  ["Overview", "/cms"],
  ["Integrations", "/cms/sub"],
  ["Showcase", "/showcase"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Settings", "/settings"],
];

export const PEPPER = process.env.PEPPER;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@example.com";

export const CONTACT_PHONE = `+${(
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "12345678910"
)
  .replace(/\D+/g, "")
  .padEnd(11, "0")
  .substring(0, 11)}`;

export const CONTACT_PHONE_PRETTY = CONTACT_PHONE.replace(
  /(\d{1})(\d{3})(\d{3})(\d{4})/,
  "$1 ($2) $3-$4"
);
