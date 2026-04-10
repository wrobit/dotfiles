# Dotfiles

Personal macOS development environment setup.

## Current state

This repository currently contains:

- `Brewfile`
  - Homebrew taps and packages for day-to-day development.
  - Includes CLI tooling (`git`, `gh`, `nvm`, `pnpm`, `yarn`, `bun`, `opencode`), runtimes (`openjdk@17`, `.NET`), and utilities (`watchman`, `cocoapods`, `git-lfs`).
  - Includes casks like `ghostty`, `dotnet-sdk`, and `zulu@17`.
  - Installs VS Code extensions (`github.copilot`, `github.copilot-chat`, `teabyii.ayu`, `wakatime.vscode-wakatime`).

- `zsh/.zshrc`
  - Oh My Zsh base setup using the `robbyrussell` theme.
  - Loads `zsh-autosuggestions` and `zsh-syntax-highlighting` from Homebrew paths.
  - Configures `nvm`, Java (`JAVA_HOME`), Android SDK paths, and Ruby gem path.
  - Defines a `yeet()` helper that stages all changes, shows staged diff summary, confirms on Enter, then commits and pushes.

- `zsh/.pom.sh`
  - Terminal Pomodoro script with configurable work/break durations and cycle count.
  - Renders a live progress bar and supports quitting with `q`.

- `git/.gitconfig`
  - Sets user identity, increases HTTP post buffer, and enables Git LFS filter settings.

- `ghostty/config`
  - Ghostty UI and behavior config (theme, titlebar style, cursor, split style, opacity).

- `.vscode/settings.json`
  - Shared editor/workbench settings for Cursor/VS Code style environments.
  - Includes formatting/lint-on-save behavior, font/theme preferences, Git/GitLens preferences, and Cursor-specific options.

- `.agents/skills/`
  - AI agent skills for OpenCode and other agent tools.
  - `agent-workflow`: Structured research → plan → critique → implement → polish loop for non-trivial work.
  - `learn`: Specialist teacher mode for deep conceptual learning without code solutions.
  - `research`, `build-plan`, `plan-critique`, `polish`: Individual phase skills that reference the agent-workflow rules.
  - Each skill includes YAML frontmatter, usage examples, and detailed rule files.

## Scope

This repo is focused on shell, terminal, git, editor, machine bootstrap configuration, and AI agent skills.

## Apply this setup

From the repository root:

```bash
# 1) Install Homebrew packages, casks, and VS Code extensions
brew bundle --file Brewfile

# 2) Restore shell and git config
cp zsh/.zshrc ~/.zshrc
cp git/.gitconfig ~/.gitconfig

# 3) (Optional) Install Pomodoro helper script
mkdir -p ~/.local/bin
cp zsh/.pom.sh ~/.local/bin/pom
chmod +x ~/.local/bin/pom

# 4) Restore Ghostty config
mkdir -p ~/.config/ghostty
cp ghostty/config ~/.config/ghostty/config

# 5) Restore editor settings (pick your editor)
# Cursor:
mkdir -p "$HOME/Library/Application Support/Cursor/User"
cp .vscode/settings.json "$HOME/Library/Application Support/Cursor/User/settings.json"

# VS Code:
mkdir -p "$HOME/Library/Application Support/Code/User"
cp .vscode/settings.json "$HOME/Library/Application Support/Code/User/settings.json"

# 6) Install AI agent skills (optional)
# Global (available in all projects):
cp -r .agents ~/.agents

# Project-local (for this repo only):
# Skills are already in .agents/skills/ and will be discovered by OpenCode
```
