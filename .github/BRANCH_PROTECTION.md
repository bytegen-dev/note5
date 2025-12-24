# Branch Protection Rules Guide

## What are Branch Protection Rules?

Branch protection rules enforce requirements before code can be merged into protected branches (like `main`). They help maintain code quality and prevent accidental changes.

## How to Set Up Branch Protection Rules

1. Go to your GitHub repository: https://github.com/bytegen-dev/note5
2. Click **Settings** → **Branches** (in the left sidebar)
3. Click **Add branch protection rule** or **Add rule**
4. Enter the branch name pattern (e.g., `main` or `*` for all branches)
5. Configure the rules you want

## Recommended Rules for `main` Branch

### ✅ Essential Rules

1. **Require a pull request before merging**
   - ✅ Require approvals: `1` (or more)
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require review from Code Owners (if you have a CODEOWNERS file)

2. **Require status checks to pass before merging**
   - ✅ Require branches to be up to date before merging
   - Select the required status checks:
     - `build` (from your CI workflow)

3. **Require conversation resolution before merging**
   - ✅ Require all conversations on code to be resolved

### 🔒 Additional Security Rules

4. **Restrict who can push to matching branches**
   - ✅ Restrict pushes that create matching branches
   - (This prevents direct pushes to `main`)

5. **Do not allow bypassing the above settings**
   - ✅ Do not allow bypassing the above settings
   - (Even admins must follow the rules)

6. **Allow force pushes**
   - ❌ **Unchecked** (prevents force pushes)

7. **Allow deletions**
   - ❌ **Unchecked** (prevents branch deletion)

## Example Configuration

For a typical project, you'd configure:

```
Branch name pattern: main

✅ Require a pull request before merging
  - Require approvals: 1
  - Dismiss stale pull request approvals when new commits are pushed

✅ Require status checks to pass before merging
  - Require branches to be up to date before merging
  - Required status checks:
    - build

✅ Require conversation resolution before merging

✅ Restrict who can push to matching branches

✅ Do not allow bypassing the above settings

❌ Allow force pushes (UNCHECKED)
❌ Allow deletions (UNCHECKED)
```

## Benefits

- **Code Quality**: Ensures all code is reviewed before merging
- **CI/CD Safety**: Prevents broken code from being merged
- **Collaboration**: Encourages code review and discussion
- **History Integrity**: Prevents force pushes that rewrite history
- **Accountability**: All changes go through PRs with clear history

## Notes

- Branch protection rules only apply to the specified branch pattern
- You can have different rules for different branches (e.g., stricter rules for `main`, looser for `develop`)
- Rules apply to everyone, including admins (if "Do not allow bypassing" is enabled)
