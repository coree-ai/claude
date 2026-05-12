# Coree Claude Code Plugin

[Coree](https://github.com/coree-ai/coree) provides persistent memory and code intelligence for AI agents. This plugin integrates Coree into Claude Code.

## Features

- **Persistent Memory**: Stores decisions, architectural discoveries, and gotchas across sessions.
- **Code Intelligence**: Hybrid search over source code and git history.
- **Session Injection**: Automatically injects relevant context into your session using lifecycle hooks.

## Installation

```bash
claude plugin marketplace add github:coree-ai/claude
claude plugin install coree
```

## Usage

Once installed, Coree provides several MCP tools. You can ask Claude to search your codebase or memories:

```
search for how the indexing works
```

See [CLAUDE.md](./CLAUDE.md) for more detailed usage guidelines.
