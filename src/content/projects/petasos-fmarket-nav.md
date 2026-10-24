---
title: Petasos Fmarket NAV
tagline: A Hermes Agent skill that tracks Fmarket.vn fund NAVs into an Obsidian vault — per-fund series, buy-more and DCA signal alerts, and a generated view.
kicker: Skill · 2026
stack: hermes-agent · investing · obsidian
repo: https://github.com/nhutdm/petasos-fmarket-nav
order: 3
seo:
  description: A Hermes Agent skill that tracks Fmarket.vn fund NAVs into an Obsidian vault — per-fund series, buy-more and DCA signal alerts, and a generated view.
---

A [Hermes Agent](https://hermes-agent.nousresearch.com) skill — a package
that lets the open-source Hermes AI assistant do a job for you — that
watches your mutual-fund investments. Every evening it reads the day's
published price from [Fmarket](https://fmarket.vn), appends it to a small
series file inside [Obsidian](https://obsidian.md), and speaks up only when
your own rules say it's time to act — so investment decisions come from
fresh numbers, not from opening five apps.

## Where it earns its keep

- *"Should I add more today?"* — when the fund's price drops 10% or 17%
  below your average cost, it says so — once per level, never nagging.
- *Every evening* — the day's price lands in your vault automatically; the
  series only ever grows, and nothing is overwritten.
- *"Is it time for my monthly top-up?"* — on the days you chose it reminds
  you before the order cut-off.
- *"How is the fund doing?"* — one generated page answers with fresh
  numbers: latest price, month and year change, and gain or loss against
  your cost.

## How it's built

- **Your rules, your data.** Which funds you track, what you paid, your
  limits — all in one plain file in your vault. Adding a fund is one entry,
  no code changes.
- **Nothing happens by accident.** A preview shows exactly what would
  change before anything is written; a malformed rule file stops everything
  loudly, naming the line.
- **Quiet by design.** If nothing needs your attention, it says nothing at
  all — news arrives only when your own thresholds are crossed.
- **Private numbers.** What you own and what you paid live only in your
  vault; the public code ships fake examples, and a privacy test fails the
  build if a real figure ever sneaks in.

## Proven by tests

The whole suite runs offline — no real Fmarket calls — with 19 tests,
including a privacy sweep over every file. Each live-API quirk found in
the wild became a permanent test case, so the same mistake cannot return
silently.

It needs only Python and one small library.
