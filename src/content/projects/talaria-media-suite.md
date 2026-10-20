---
title: Talaria Media Suite
tagline: A Hermes Agent skill that drives a self-hosted *arr media stack from the terminal — seven services behind one stdlib-only Python CLI.
kicker: Skill · 2026
stack: hermes-agent · media-stack · self-hosted
repo: https://github.com/nhutdm/talaria-media-suite
order: 2
seo:
  description: A Hermes Agent skill for a self-hosted *arr media stack — seven services behind one stdlib-only Python CLI with an offline test harness.
---

A [Hermes Agent](https://hermes-agent.nousresearch.com) skill — a package
that lets the open-source Hermes AI assistant do a job for you — that
manages a home media server. If you run Sonarr, Radarr, Lidarr, Prowlarr,
Bazarr, Overseerr, or Jellyfin (the popular "arr" family of media apps),
Talaria puts all of them within reach of one command or one plain-language
request, on your own network.

## Where it earns its keep

- *"Is the new episode out yet?"* — the calendar and missing-content views
  answer without opening four dashboards.
- *A series shows a gap in Jellyfin* — one command checks every service
  and points at the cause, instead of guessing which one dropped it.
- *A request lands in Overseerr* — approving it is one command.
- *"What's eating the disk?"* — usage snapshots in seconds, clearly
  labeled where the numbers are estimates.

## How it's built

- **Nothing to install.** It uses only what Python ships with — no
  packages, no setup. Every network call has a timeout, and connections
  are always encrypted.
- **Keys stay safe.** Passwords and API keys are read only from protected
  environment settings — never typed into commands, never printed in logs
  or error messages.
- **Nothing happens by accident.** Commands that change anything must be
  named explicitly; there is no blanket "yes to everything" flag.
- **It stays home.** The tool talks only to servers on your own network —
  no internet calls, no accounts, no sign-ins.
- **Honest numbers.** Where the media server cannot know exact viewing
  history, the output says so instead of guessing.

## Proven by tests

The whole suite is tested offline against simulated services — no real
server needed — with 116 tests that run anywhere. Every bug found in the
wild became a permanent test case, so the same mistake cannot return
silently.
