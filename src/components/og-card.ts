import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const W = 1200;
const H = 630;
const PAD = 96;

const CANVAS = "#f0ece3";
const NAVY = "#1c2644";
const GOLD = "#c8a870";
const GOLD_TEXT = "#7a5f34";
const MUTED = "#5b6377";

type OGFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
};

let fontsCache: OGFont[] | null = null;

async function loadFonts(): Promise<OGFont[]> {
  if (fontsCache) return fontsCache;
  const dir = path.join(process.cwd(), "src/assets/og-fonts");
  const read = async (f: string) => {
    const buf = await readFile(path.join(dir, f));
    return buf.buffer.slice(
      buf.byteOffset,
      buf.byteOffset + buf.byteLength,
    ) as ArrayBuffer;
  };
  fontsCache = [
    {
      name: "Source Serif 4",
      data: await read("SourceSerif4-Bold-Static.ttf"),
      weight: 700,
    },
    {
      name: "IBM Plex Mono",
      data: await read("IBMPlexMono-Regular.ttf"),
      weight: 400,
    },
    {
      name: "IBM Plex Mono",
      data: await read("IBMPlexMono-Medium.ttf"),
      weight: 500,
    },
  ];
  return fontsCache;
}

export interface OGCardOptions {
  kicker: string;
  title: string;
  dot?: boolean;
}

function wrapTitle(title: string, fontSize: number): string[] {
  const budget = Math.floor((W - PAD * 2) / (fontSize * 0.5));
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > budget && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function renderOGCard({
  kicker,
  title,
  dot = false,
}: OGCardOptions): Promise<Buffer> {
  const fonts = await loadFonts();

  const element = {
    type: "div",
    props: {
      style: {
        width: `${W}px`,
        height: `${H}px`,
        boxSizing: "border-box" as const,
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "space-between",
        padding: `${PAD}px`,
        backgroundColor: CANVAS,
        fontFamily: "IBM Plex Mono",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 6,
              color: GOLD_TEXT,
              textTransform: "uppercase" as const,
            },
            children: kicker.toUpperCase(),
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column" as const,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column" as const,
                    fontSize: title.length > 34 ? 64 : 78,
                    fontWeight: 700,
                    lineHeight: 1.12,
                    color: NAVY,
                    fontFamily: "Source Serif 4",
                    maxWidth: W - PAD * 2,
                  },
                  children: wrapTitle(title, title.length > 34 ? 64 : 78).map(
                    (line, i, lines) => ({
                      type: "div",
                      props: {
                        style: { display: "flex" },
                        children:
                          dot && i === lines.length - 1
                            ? [
                                line,
                                {
                                  type: "span",
                                  props: {
                                    style: { color: GOLD, marginLeft: -8 },
                                    children: ".",
                                  },
                                },
                              ]
                            : line,
                      },
                    }),
                  ),
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    width: 88,
                    height: 3,
                    backgroundColor: GOLD,
                    marginTop: 44,
                  },
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              fontSize: 26,
              color: MUTED,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontWeight: 500,
                    letterSpacing: 4,
                    color: NAVY,
                    textTransform: "uppercase" as const,
                  },
                  children: "Nhut Duong",
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex" },
                  children: "nhutduong.com",
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element, {
    width: W,
    height: H,
    fonts,
  });

  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
  }).render();

  return png.asPng();
}
