# Push to GitHub (Ready Checklist)

Use this guide to publish `experiment-9` as its own repository so GitHub Actions workflows work correctly.

## Why separate repository?

GitHub only detects workflow files from the repository root `.github/workflows/` path.
Your workflows are inside this folder:

- `.github/workflows/ci.yml`
- `.github/workflows/cd.yml`

So `experiment-9` should be pushed as the root of a GitHub repo.

## Option A (Recommended): New repo from this folder

Run these commands in PowerShell:

```powershell
Set-Location "D:\Workspace\Puneet C++\fullstack\experiment-9"
git init
git add .
git commit -m "Experiment 3.2.1 + 3.2.2 complete setup"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Option B: Keep current monorepo but push only this folder as subtree

From parent repo root (`fullstack`):

```powershell
Set-Location "D:\Workspace\Puneet C++\fullstack"
git subtree split --prefix=experiment-9 -b experiment-9-branch
git push https://github.com/<your-username>/<repo-name>.git experiment-9-branch:main --force
```

## Required secrets after push

In GitHub repository settings add:

- `SLACK_WEBHOOK_URL`

No Docker Hub secrets are needed because CD pushes to GHCR using `GITHUB_TOKEN`.

## Verify after push

1. Open Actions tab.
2. Create PR to trigger CI.
3. Merge to `main` to trigger CD.
4. Check image tags in GHCR:
   - `latest`
   - commit SHA
