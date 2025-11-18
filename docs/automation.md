# Automated Upstream Sync

This document explains how the automated upstream sync system works and how to configure it.

## Overview

The automated upstream sync system monitors changes from the parent repository [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) and automatically creates pull requests with adapted documentation updates when upstream changes are detected.

## How It Works

### 1. Upstream Change Detection

The existing `.github/workflows/sync-upstream.yml` workflow runs weekly and creates GitHub issues when new commits are detected in the upstream repository. These issues are labeled with `upstream-sync`.

### 2. Automatic PR Creation

When an issue with the `upstream-sync` label is created, the `.github/workflows/auto-upstream-adapt.yml` workflow automatically:

1. **Clones the upstream repository** to analyze changes
2. **Computes the diff** between the last synced commit and the latest upstream commit
3. **Applies configured adapters** to transform upstream changes for the QA-focused context
4. **Creates a draft PR** with the adapted changes
5. **Updates the upstream-sync-state** file to track progress
6. **Comments on the issue** with a link to the PR

### 3. Manual Review and Merge

The automation creates **draft PRs** that require manual review before merging. This ensures:
- Changes are appropriate for the QA context
- Unmapped files are reviewed for relevance
- Quality standards are maintained

## Configuration

### Upstream Adaptation Config

The `.github/upstream-adaptation.json` file defines how upstream changes are adapted:

```json
{
  "upstream_repo": "snarktank/ai-dev-tasks",
  "mappings": [
    {
      "upstream": "create-prd.md",
      "local": "create-trd-md.md",
      "adapters": ["clarifying_questions_format"]
    }
  ],
  "allowlist": ["*.md", "docs/**/*.md"],
  "blocklist": [".github/workflows/**"],
  "adapters": {
    "clarifying_questions_format": {
      "description": "Add structured clarifying questions format",
      "action": "replace_pattern",
      "pattern": "old text",
      "replacement": "new text"
    }
  }
}
```

### Key Configuration Elements

#### Mappings

Maps upstream files to their local equivalents:
- `upstream`: File path in the upstream repository
- `local`: Corresponding file path in this repository
- `adapters`: List of adapter names to apply
- `description`: Human-readable description of the mapping

#### Allowlist/Blocklist

Safety restrictions on which files can be modified:
- `allowlist`: Patterns for files that can be modified (e.g., `*.md`, `docs/**/*.md`)
- `blocklist`: Patterns for files that should never be modified (e.g., `.github/workflows/**`)

#### Adapters

Transformation rules that adapt upstream changes:
- `description`: What the adapter does
- `action`: Type of transformation (`replace_pattern`, `insert_after_marker`, etc.)
- `pattern`: Text to find (for replace_pattern)
- `replacement`: Text to replace with (for replace_pattern)
- `check_exists`: Text to check if adapter was already applied (idempotency)

## Adapter Types

### replace_pattern

Replaces a text pattern with new text:

```json
{
  "action": "replace_pattern",
  "pattern": "Cursor, Claude Code, Windsurf",
  "replacement": "[Amp](https://ampcode.com), Cursor, Claude Code, Windsurf",
  "check_exists": "Amp"
}
```

### insert_after_marker / insert_before_marker

Inserts content at a specific location (future enhancement):

```json
{
  "action": "insert_after_marker",
  "marker": "## Process",
  "check_exists": "## Clarifying Questions"
}
```

## Adding New Adapters

To add a new adapter:

1. **Define the adapter** in `.github/upstream-adaptation.json`:
   ```json
   "adapters": {
     "my_new_adapter": {
       "description": "What this adapter does",
       "action": "replace_pattern",
       "pattern": "text to find",
       "replacement": "text to replace with",
       "check_exists": "unique text to verify it was applied"
     }
   }
   ```

2. **Add to a mapping**:
   ```json
   "mappings": [
     {
       "upstream": "some-file.md",
       "local": "local-file.md",
       "adapters": ["my_new_adapter"]
     }
   ]
   ```

3. **Test locally**:
   ```bash
   node .github/scripts/auto-adapt.mjs \
     --mapping .github/upstream-adaptation.json \
     --upstream /path/to/upstream \
     --prev <old_commit> \
     --latest <new_commit>
   ```

## Safety Features

### Idempotency

Adapters check if changes already exist before applying them using the `check_exists` field. This prevents duplicate changes if the workflow runs multiple times.

### File Restrictions

The allowlist and blocklist ensure the automation only modifies documentation files and never touches:
- Workflow files (`.github/workflows/**`)
- Code files (`**/*.js`, `**/*.json`)
- Configuration files

### Draft PRs

All PRs are created as drafts, requiring manual approval before merge. This provides a safety gate for review.

### Unmapped File Detection

The automation detects upstream files that have no mapping configured and lists them in the PR for manual review.

## Troubleshooting

### Workflow Not Triggering

Check that:
1. The issue has the `upstream-sync` label
2. The workflow file has correct permissions
3. GitHub Actions are enabled for the repository

### Adapters Not Applying

Common issues:
1. **Pattern not found**: The text pattern doesn't exist in the file
2. **Already applied**: The `check_exists` text is already present
3. **File not in allowlist**: The target file is blocked by safety restrictions

Check the workflow logs and the adaptation summary in the PR description for details.

### Testing Locally

Test the adapter script locally before committing changes:

```bash
# Clone upstream repository
git clone https://github.com/snarktank/ai-dev-tasks.git /tmp/upstream

# Run adapter script
node .github/scripts/auto-adapt.mjs \
  --mapping .github/upstream-adaptation.json \
  --upstream /tmp/upstream \
  --prev $(cat .github/upstream-sync-state) \
  --latest $(cd /tmp/upstream && git rev-parse HEAD)

# Check the summary
cat /tmp/adaptation-summary.json
```

## Future Enhancements

Potential improvements for the automation:

1. **Complex insertions**: Support for inserting full content blocks (not just pattern replacement)
2. **AI-powered adaptation**: Use AI APIs to intelligently adapt semantic changes
3. **Auto-merge for trivial changes**: Optional auto-merge for simple documentation updates
4. **Conflict resolution**: Automatic handling of merge conflicts
5. **Multi-file adapters**: Adapters that coordinate changes across multiple files

## Workflow Files

- `.github/workflows/sync-upstream.yml`: Detects upstream changes and creates issues
- `.github/workflows/auto-upstream-adapt.yml`: Automatically creates PRs from sync issues
- `.github/upstream-adaptation.json`: Configuration for adapters and mappings
- `.github/scripts/auto-adapt.mjs`: Node.js script that applies adapters
- `.github/upstream-sync-state`: Tracks the last synced upstream commit

## Related Documentation

- [Contributing Guide](../contributing-guide.md): General contribution guidelines
- [Best Practices](best-practices.md): Testing and documentation standards
- [Windsurf Setup](windsurf-setup.md): AI assistant configuration
