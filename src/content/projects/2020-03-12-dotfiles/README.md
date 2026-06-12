---
title: .dotfiles — My macOS Development Environment
description: A comprehensive dotfiles repository for bootstrapping a fully configured macOS development environment — from shell, editor, and Git to Homebrew packages, macOS system preferences, and iTerm2.
published: true
author:
  name: Danny Koppenhagen
  mail: mail@k9n.dev
updated: 2026-06-12
keywords:
  - dotfiles
  - zsh
  - bash
  - vscode
  - vim
  - macOS
  - iterm2
  - homebrew
  - developer-setup
  - shell
  - git
language: en
thumbnail:
  header: ./dotfiles-header.jpg
  card: ./dotfiles-header-small.jpg
status: active
---

My `.dotfiles` repository is a one-stop solution for bootstrapping a complete macOS development environment from scratch. It bundles shell configuration (Zsh, Oh My Zsh, plugins, aliases, functions), editor settings, Git config with commit templates, Vim setup, Homebrew packages, macOS system preferences, and iTerm2 configuration — all orchestrated by a single setup script.

## Highlights

- **One-command setup** — `setup-dotfiles.sh` installs Homebrew, all packages from a `Brewfile`, symlinks dotfiles, sets up Oh My Zsh, SDKMAN, and editor settings automatically.
- **Backup workflow** — Easily export your current state (Brewfile, extensions, settings) before migrating to a new Mac.
- **Editor-ready** — Includes shared `settings.json` for VS Code, plus an extension install script.
- **Shell power** — Zsh config with useful aliases, custom functions (e.g. `killport`), fnm for Node.js version management, and SDKMAN for Java.
- **macOS tuning** — Script for Finder, Dock, Trackpad, screenshot folder, hot corners and more.
- **Modular & private** — Local overrides (`.zshrc.local`, `settings.local.json`, `setup-dotfiles.local.sh`) are gitignored so sensitive values stay out of the repo.
- **Git best practices** — Preconfigured `.gitconfig` with aliases, colors, LFS, pull rebase, and an Angular Commit Format template.

Check out the full documentation and all stored configurations on [GitHub](https://github.com/d-koppenhagen/.dotfiles).
