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
  socialLinks?: SocialLink[];
  hero?: Hero;
};

const siteConfig: SiteConfig = {
  title: "Nhut Duong",
  description:
    "A Vietnam-based full-stack web developer who specializes in JavaScript, AngularJS, React, Node.js, PHP and WordPress.",
  author: "Nhut Duong",
  twitter: "@nhutdm",
  image: {
    src: "/og.png",
    alt: "Nhut Duong",
  },
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
    title: "Full Stack Developer and Consultant.",
    text: "Hello, I'm Nhut Duong, a full stack developer and consultant with a passion for creating dynamic web solutions. At Bosch Digital in Vietnam, I lead projects that exceed client expectations.",
  },
};

export default siteConfig;
