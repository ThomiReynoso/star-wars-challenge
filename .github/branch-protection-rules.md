# Branch Protection Rules Configuration

This document outlines the recommended branch protection rules for this repository. These rules should be configured in GitHub repository settings.

## Main Branch Protection

### Settings for `main` branch:

#### Protect matching branches
- [x] **Restrict pushes that create files larger than 100MB**

#### Require a pull request before merging
- [x] **Require a pull request before merging**
- [x] **Require approvals**: 2
- [x] **Dismiss stale reviews when new commits are pushed**
- [x] **Require review from code owners**
- [x] **Restrict pushes that create files larger than 100MB**

#### Require status checks to pass before merging
- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**

**Required status checks:**
- `Code Quality`
- `Unit Tests` 
- `E2E Tests`
- `Build Application`
- `Security Scan`
- `PR Validation`

#### Require conversation resolution before merging
- [x] **Require conversation resolution before merging**

#### Require signed commits
- [x] **Require signed commits**

#### Require linear history
- [x] **Require linear history**

#### Restrictions
- [x] **Restrict pushes**
  - Only allow administrators and maintainers to push
- [x] **Allow force pushes**: Nobody
- [x] **Allow deletions**: Nobody

## Develop Branch Protection

### Settings for `develop` branch:

#### Require a pull request before merging
- [x] **Require a pull request before merging**
- [x] **Require approvals**: 1
- [x] **Dismiss stale reviews when new commits are pushed**

#### Require status checks to pass before merging
- [x] **Require status checks to pass before merging**
- [x] **Require branches to be up to date before merging**

**Required status checks:**
- `Code Quality`
- `Unit Tests`
- `E2E Tests`

#### Allow force pushes
- [x] **Allow force pushes**: Specify who can force push (Administrators only)

## Repository Rules

### Additional repository-wide settings:

#### General
- [x] **Private vulnerability reporting**: Enabled
- [x] **Delete head branches automatically**: Enabled
- [x] **Allow merge commits**: Disabled
- [x] **Allow squash merging**: Enabled (default)
- [x] **Allow rebase merging**: Enabled

#### Default merge commit message
- **Title**: Pull request title
- **Description**: Pull request description

## Setup Instructions

To configure these rules in GitHub:

1. Go to repository **Settings** → **Branches**
2. Click **Add rule** for each branch
3. Configure the settings as outlined above
4. Save the rules

### API Configuration (Optional)

You can also configure these rules via GitHub API or terraform:

```bash
# Example: Protect main branch via GitHub CLI
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Code Quality","Unit Tests","E2E Tests","Build Application"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":2,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```

## Monitoring and Compliance

- Review protection rules quarterly
- Monitor bypass attempts in audit logs
- Ensure all team members understand the rules
- Update rules as the team and project evolve