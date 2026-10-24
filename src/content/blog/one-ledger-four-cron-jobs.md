---
title: One Ledger, Four Cron Jobs
excerpt: The daily rhythm of a family finance system built on two small Python skills and four cron jobs — a morning digest, one-line expense logging, evening NAV syncs, and a month that closes like a book.
publishDate: '2026-10-24'
tags:
  - Personal Finance
  - Automation
---

Every morning at seven, my phone gets one Telegram message. It lists the
bank transactions that landed overnight — a lunch here, an internet bill
there — already sorted, already checked against the running balance, and
already filed into a ledger I own. If something looks odd, the message asks
me about it. Once. If nothing happened, my phone stays silent.

I didn't build this to be impressive. I built it because I was tired of
answering "where did the money go?" from memory.

## The system is two small Python skills

The heart is [Petasos Finance Vault](/projects/petasos-finance-vault/): an
append-only ledger that lives inside my
[Obsidian](https://obsidian.md) vault — one JSON line per transaction,
nothing ever overwritten. Around it sits one companion:
[Petasos Fmarket NAV](/projects/petasos-fmarket-nav/), which tracks our
mutual-fund price every evening. Four cron jobs tie them together — a
morning digest, a weekly reconciliation, a monthly close, and the evening
price check — plus a handful of plain-text files and rules I can read and
edit myself.

The design rule that matters most: **the ledger is the only place where
numbers live.** Everything else — dashboards, monthly reviews, answers to
my own questions — is generated from it. When I ask "how much did we spend
on groceries?", the answer comes from the ledger, never from memory.

## 07:00 — the morning digest

The day starts with the bank. My banks send alert emails for every
transaction; a cron job fetches them, parses the amounts, and checks the
math: does each new balance actually follow from the previous one? A
batched alert, a duplicated email, or a missing credit gets flagged before
anything is written. If the chain doesn't hold, the pipeline appends
nothing and tells me why.

Most mornings the digest is five lines. Lunch at the office canteen,
52,000 dong. A coffee stand near the office — 26,000, automatically
recognized as coffee because I confirmed that pattern once and it never
asked again. The tenant's rent arriving on the sixth. Each row already
carries its category, because a file of rules I maintain maps the merchant
names to buckets: food is food, fuel is fuel, a bill payment is never an
expense.

## Logging life in one line

Cash is where most systems die, so cash gets the most attention. When I
buy a coffee for 20,000 dong, I say so in a chat message — "coffee 20k
cash" — and it becomes a ledger row immediately, with the drawer balance
adjusted in the same step. No receipt-chasing at the end of the month, no
"misc" bucket quietly absorbing everything.

When the drawer drifts — it always drifts, because market groceries don't
come with alerts — we count the cash on hand, and the difference becomes
one honest line: *unlogged cash spending, mostly market runs*. Not spread
invisibly across a month. One number, on the record.

## Some things refuse to be automatic

Not everything can be a pattern. Cash withdrawals from the ATM are
re-asked every single time, by design — the one rule that never
auto-posts. My wife's bank sends no email alerts at all, so her salary and
her card statement arrive as app screenshots, read and reconciled by hand.
And the mortgage is the quietest transaction of all: the bank debits it
silently, so each payment is verified by arithmetic — the interest is the
remaining principal times the rate times the actual days in the cycle, and
if the number doesn't come out exact, something is wrong.

That last rule has a name in my notes: **the app is truth, the books are a
hypothesis.** When the balance on my phone disagrees with the ledger, the
ledger gets investigated — never the phone. More than once this has found
a real mistake: an alert that understated a transfer by 88 dong, a card
payment that existed in one book but not the other, a mortgage statement
that didn't match its own history by 1.2 million. Small numbers, real
errors, all caught because one side refused to be hand-waved.

## 20:00 — the investments check in

In the evening, a second cron reads the day's published fund price from
[Fmarket](https://fmarket.vn), appends it to a per-fund series, and
evaluates the rules I set for myself: my monthly top-up window, the price
levels at which I've decided buying more is worth it, the cap beyond which
I stop adding. Like the morning digest, it is silent unless something
needs me. The alerts arrive on Telegram at dinner time — one line, one
decision.

## The month closes like a book

On the second of each month — the second, not the first, because
stragglers land on day one — a final job checks that every gate is green
and no question is unanswered, then freezes the month's expense total and
archives a full snapshot. Closed months can't quietly change later; if a
late correction is ever needed, it happens loudly, with the old total on
record.

## What it changed

The honest answer is: not the spending. Coffee still costs 20,000 dong.
What changed is the friction. Recording money went from a chore I postponed
to a sentence I type anyway. Checking it went from a spreadsheet session to
a glance. And the questions — "can we afford this?", "where did last month
go?" — stopped being archaeology and started being lookups.

You don't need my three skills to get there. You need one trusted place
where the numbers live, one rule that nothing else gets to overwrite them,
and the discipline to let a machine ask you things once instead of
wondering about them forever. The cron jobs are just the reminder.
