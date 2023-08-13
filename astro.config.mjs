import { defineConfig } from "astro/config";

import Compress from "astro-compress";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [Compress(), sitemap(), tailwind()],
});
