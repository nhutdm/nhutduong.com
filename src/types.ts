export type Site = {
  website: string;
  author: string;
  title: string;
  desc: string;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
}[];

export type SocialIcons = {
  [social in SocialMedia]: string;
};

export type SocialMedia = "GitHub" | "LinkedIn" | "Twitter";
