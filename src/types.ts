export type Site = {
  website: string;
  author: string;
  title: string;
  desc: string;
  ogImage: string;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia = "GitHub" | "LinkedIn" | "X";
