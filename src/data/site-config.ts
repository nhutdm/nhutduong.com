export type Image = {
  src: string;
  alt?: string;
  caption?: string;
};

export type Link = {
  text: string;
  href: string;
};

export type SocialLink = Link & {
  icon: "github" | "linkedin" | "x";
};

export type Hero = {
  title?: string;
  text?: string;
};

export type SiteConfig = {
  title: string;
  description: string;
  author: string;
  twitter: string;
  image?: Image;
  primaryNavLinks?: Link[];
  socialLinks?: SocialLink[];
  hero?: Hero;
};

const siteConfig: SiteConfig = {
  title: "Nhut Duong",
  description:
    "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with crafting seamless, impactful digital solutions.",
  author: "Nhut Duong",
  twitter: "@nhutdm",
  image: {
    src: "/og.png",
    alt: "Nhut Duong",
  },
  primaryNavLinks: [
    {
      text: "About",
      href: "/about",
    },
  ],
  socialLinks: [
    {
      text: "X",
      href: "https://x.com/nhutdm",
      icon: "x",
    },
    {
      text: "GitHub",
      href: "https://github.com/nhutdm",
      icon: "github",
    },
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/in/nhutdm/",
      icon: "linkedin",
    },
  ],
  hero: {
    title: "Hey, I'm Nhut.",
    text: "I'm a full stack developer and consultant based in Ho Chi Minh City, Vietnam, obsessed with creating innovative digital solutions. I blend sleek front-end design with robust back-end development to build seamless, impactful experiences.",
  },
};

export default siteConfig;
