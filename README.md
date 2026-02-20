# Dotfiles

Personal development environment dotfiles for macOS.

## What this repo includes

- `Brewfile` - Homebrew bundle for CLI tools, casks, and VS Code extensions.
- `zsh/.zshrc` - Oh My Zsh setup
- `git/.gitconfig` - Git defaults (user identity, larger HTTP post buffer, Git LFS filter settings).
- `ghostty/config` - Ghostty terminal theme and behavior settings.
- `.vscode/settings.json` - Editor settings (Cursor/VS Code-compatible).

## Scope

This repository is focused on shell, terminal, git, editor, and machine bootstrap configuration.

## Restore everything

From the repository root, run:

```bash
# 1) Install Homebrew packages, casks, and VS Code extensions
brew bundle --file Brewfile

# 2) Restore shell and git config
cp zsh/.zshrc ~/.zshrc
cp git/.gitconfig ~/.gitconfig

# 3) Restore Ghostty config
mkdir -p ~/.config/ghostty
cp ghostty/config ~/.config/ghostty/config

# 4) Restore editor settings (pick your editor)
# Cursor:
mkdir -p "$HOME/Library/Application Support/Cursor/User"
cp settings.json "$HOME/Library/Application Support/Cursor/User/settings.json"

# VS Code:
mkdir -p "$HOME/Library/Application Support/Code/User"
cp settings.json "$HOME/Library/Application Support/Code/User/settings.json"
```
