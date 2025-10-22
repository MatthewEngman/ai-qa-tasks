# Upstream Repository Sync

This directory contains automation for monitoring the upstream [snarktank/ai-dev-tasks](https://github.com/snarktank/ai-dev-tasks) repository for changes that may be valuable to incorporate into this QA-focused repository.

## How It Works

### Automated Monitoring

The `sync-upstream.yml` workflow automatically:

1. **Runs weekly** every Monday at 9:00 AM UTC
2. **Clones** the upstream ai-dev-tasks repository
3. **Compares** commits since the last check
4. **Creates an issue** if new commits are found with:
   - List of changed files
   - Detailed commit information
   - Links to compare changes
   - Recommended actions

### Manual Triggering

You can manually trigger the sync check:

1. Go to **Actions** tab in GitHub
2. Select **Sync Upstream Repository** workflow
3. Click **Run workflow**
4. Choose the branch (usually `main`)
5. Click **Run workflow** button

## Tracking State

The file `.github/upstream-sync-state` contains the last checked commit hash from the upstream repository. This prevents duplicate issues for the same changes.

### Current State

```bash
cat .github/upstream-sync-state
```

Shows the commit hash that was last checked.

### Updating After Review

After reviewing upstream changes and incorporating relevant updates:

1. Get the latest upstream commit hash from the issue
2. Update the tracking file:
   ```bash
   echo "NEW_COMMIT_HASH" > .github/upstream-sync-state
   git add .github/upstream-sync-state
   git commit -m "chore(sync): update upstream tracking state to NEW_COMMIT_HASH"
   git push
   ```

## Issue Labels

Issues created by this workflow are tagged with:
- `upstream-sync` - Indicates automated upstream monitoring
- `documentation` - Suggests documentation review may be needed

## Workflow Configuration

### Schedule

Default: Every Monday at 9:00 AM UTC

To change the schedule, edit the cron expression in `.github/workflows/sync-upstream.yml`:

```yaml
schedule:
  - cron: '0 9 * * 1'  # minute hour day-of-month month day-of-week
```

Examples:
- Daily at midnight: `'0 0 * * *'`
- Every 2 weeks: `'0 9 * * 1/2'`
- First day of month: `'0 9 1 * *'`

### Permissions

The workflow requires:
- `contents: read` - To checkout the repository
- `issues: write` - To create issues with update notifications

## Evaluation Process

When an issue is created:

1. **Review the commit details** in the issue
2. **Click the "Compare Changes" link** to see the diff
3. **Evaluate each change** for applicability:
   - Does it improve workflow clarity?
   - Does it add valuable features?
   - Is it relevant to QA workflows?
   - Does it conflict with existing QA-specific content?
4. **Adapt changes** for QA context if valuable
5. **Create a PR** with the adapted changes
6. **Update tracking state** after incorporating or dismissing changes

## Example Workflow

```bash
# 1. Workflow runs and creates issue #5 with upstream changes

# 2. Review the issue and upstream changes
# Visit: https://github.com/snarktank/ai-dev-tasks/compare/OLD_HASH...NEW_HASH

# 3. If changes are valuable, create a branch
git checkout -b feature/upstream-updates-2025-01

# 4. Make adaptations for QA workflows
# Edit relevant files...

# 5. Commit and push
git add .
git commit -m "feat(workflow): incorporate upstream updates from Jan 2025"
git push origin feature/upstream-updates-2025-01

# 6. Create PR and merge

# 7. Update tracking state
echo "NEW_COMMIT_HASH" > .github/upstream-sync-state
git add .github/upstream-sync-state
git commit -m "chore(sync): update upstream tracking state"
git push
```

## Troubleshooting

### No Issues Created

If the workflow runs but doesn't create issues:
- Check that there are new commits in upstream
- Verify the tracking state file has the correct hash
- Check workflow logs in Actions tab

### Duplicate Issues

If multiple issues are created for the same changes:
- Ensure tracking state file is updated after each review
- Check that the file is committed to the repository

### Workflow Fails

Common issues:
- **Permission errors**: Ensure workflow has `issues: write` permission
- **Rate limiting**: GitHub API rate limits may affect frequent runs
- **Network issues**: Temporary failures cloning upstream repo

Check the Actions tab for detailed error logs.

## Maintenance

### Disabling Sync

To temporarily disable automatic sync:

1. Edit `.github/workflows/sync-upstream.yml`
2. Comment out the `schedule` section:
   ```yaml
   # schedule:
   #   - cron: '0 9 * * 1'
   ```
3. Commit and push

Manual triggering will still work.

### Permanently Removing

To completely remove upstream sync:

```bash
rm .github/workflows/sync-upstream.yml
rm .github/upstream-sync-state
rm .github/UPSTREAM_SYNC.md
git add .github/
git commit -m "chore: remove upstream sync automation"
git push
```

## Benefits

- **Stay informed** about upstream improvements
- **Reduce manual checking** of upstream repository
- **Track changes systematically** with issue history
- **Maintain QA focus** while benefiting from upstream evolution
- **Document decisions** about which changes to incorporate

## Related Documentation

- [Contributing Guide](../contributing-guide.md) - How to contribute changes
- [Best Practices](../docs/best-practices.md) - Quality standards for changes
- [Upstream Repository](https://github.com/snarktank/ai-dev-tasks) - Original source
