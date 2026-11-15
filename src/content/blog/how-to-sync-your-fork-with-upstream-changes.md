---
title: How to Sync Your Fork with Upstream Changes
excerpt: 'Keep your fork in sync with the upstream repository while preserving your commits: rebasing your fork and resolving conflicts.'
publishDate: '2024-09-24'
tags:
  - Git
---

When you work with forked repositories, keep your fork up-to-date with the original (upstream) repository. That way you work with the latest code and lower the chances of conflicts when submitting pull requests. This guide covers syncing a fork while preserving your own commits.

## Prerequisites

Before you start, make sure you have:

1. Git installed on your local machine
2. A forked repository cloned to your local machine
3. Basic familiarity with Git commands

## Step-by-Step Guide

### 1. Set Up the Upstream Remote

If you haven't already, you need to add the original repository as a remote. This is typically called "upstream".

```bash
git remote add upstream https://github.com/original-owner/repository-name.git
```

To verify, run:

```bash
git remote -v
```

You should see both your fork (origin) and the upstream repository listed.

### 2. Fetch the Latest Upstream Changes

Before synchronizing, fetch the latest changes from the upstream repository:

```bash
git fetch upstream
```

### 3. Switch to Your Main Branch

Ensure you're on the branch you want to update (usually `main` or `master`):

```bash
git checkout main
```

### 4. Rebase Your Branch

Now, rebase your branch on top of the upstream changes:

```bash
git rebase upstream/main
```

This step replays your commits on top of the latest upstream changes, keeping your commit history clean and linear.

### 5. Resolve Conflicts (if any)

If there are conflicts during the rebase, Git will pause and allow you to resolve them. After resolving conflicts in each file:

```bash
git add <filename>
git rebase --continue
```

Repeat this process until all conflicts are resolved and the rebase is complete.

### 6. Update Your Fork on GitHub

Once the rebase is successful, you'll need to update your fork on GitHub. Since you've rewritten your commit history, you'll need to force push:

```bash
git push origin main --force
```

**Note:** Be cautious with force pushing, especially if you're collaborating with others on the same branch.

## Best Practices

- Regularly sync your fork to minimize large divergences
- Create feature branches for your work instead of committing directly to main
- If you're collaborating with others, communicate before force pushing

## Conclusion

These steps keep your fork up-to-date with the upstream repository while preserving your own commits, and they keep your history clean and linear, which makes it easier to contribute back to the original project.

Rebase rewrites Git history, so be careful with it on shared branches.
