export type Image = {
  src: string;
  alt?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type SocialLink = Link;

export type SiteConfig = {
  title: string;
  titleSeparator: string;
  description: string;
  author: string;
  twitter: string;
  image?: Image;
  primaryNavLinks?: Link[];
  socialLinks?: SocialLink[];
};

const siteUrl = (import.meta.env.SITE ?? "https://nhutduong.com").replace(
  /\/$/,
  "",
);

const siteConfig: SiteConfig = {
  title: "Nhut Duong",
  titleSeparator: "|",
  description:
    "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, focused on crafting reliable, impactful digital solutions.",
  author: "Nhut Duong",
  twitter: "@nhutdm",
  image: {
    src: "/og/default.png",
    alt: "Nhut Duong - Full Stack Developer and Consultant in Ho Chi Minh City, Vietnam",
  },
  primaryNavLinks: [
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Blog",
      href: "/blog",
    },
  ],
  socialLinks: [
    {
      text: "RSS",
      href: `${siteUrl}/rss.xml`,
    },
    {
      text: "X",
      href: "https://x.com/nhutdm",
    },
    {
      text: "GitHub",
      href: "https://github.com/nhutdm",
    },
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/nhutdm/",
    },
  ],
};

export default siteConfig;
