---
title: Petasos Finance Vault
tagline: A Hermes Agent skill that runs household finance as an append-only ledger — an Obsidian vault with bank-email adapters, verification gates, and a repeatable monthly close.
kicker: Skill · 2026
stack: hermes-agent · personal-finance · obsidian
repo: https://github.com/nhutdm/petasos-finance-vault
order: 1
seo:
  description: A Hermes Agent skill for household finance as an append-only ledger — an Obsidian vault with bank-email adapters, verification gates, and a monthly close.
---

A [Hermes Agent](https://hermes-agent.nousresearch.com) skill — a package
that lets the open-source Hermes AI assistant do a job for you — that
keeps track of a family's money. Petasos reads the alert emails your bank
sends, records every transaction in a simple ledger you own inside
[Obsidian](https://obsidian.md), and re-checks the math after every
change — so any question about your balance or spending is answered from
verified numbers, never from memory.

## Where it earns its keep

- *Cash spent on the go* — mention it in chat or run one command, and
  it's recorded on the spot, never left for a cleanup later.
- *Every morning* — it fetches new bank alerts, checks that each amount
  matches the running balance, files the transaction, and asks about
  anything it isn't sure of — once.
- *"Wait, did this month balance?"* — answered from verified records. If
  the math doesn't hold, it says so before any report is produced.
- *End of the month* — one command locks the month's totals and saves a
  full snapshot; closed months can't quietly change later.

## How it's built

- **One ledger, never edited by hand.** Every entry goes in through a
  checked command; the ledger file only ever grows — nothing is
  overwritten or deleted.
- **The math must pass.** After every change it re-checks that entries
  are unique, balances add up, and the running chain holds. A preview
  mode shows exactly what would change before anything is written.
- **Your rules, your data.** How each bank's emails look and how
  purchases are categorized live in two plain files in your vault —
  adding a new bank is one entry, no code changes.
- **Months close like accounting books.** Totals are frozen with a
  snapshot as a restore point, and two processes can never write at the
  same time.

It needs only Python and one small library.
