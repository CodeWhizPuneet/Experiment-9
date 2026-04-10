# Experiment 3.2.1 + 3.2.2 (Combined in One Project)

This single project implements both requirements together:

- Experiment 3.2.1: Dockerize React application with multi-stage build
- Experiment 3.2.2: CI/CD pipeline with GitHub Actions

## Final Outcomes

- Production-ready multi-stage Docker image (Node build stage + Nginx runtime stage)
- React app served by Nginx on host port `8080`
- Gzip compression enabled in Nginx
- Static asset caching headers configured
- Environment variables handled via Docker build argument (`VITE_API_URL`)
- CI workflow runs tests and build on pull requests
- CD workflow builds and pushes image to GitHub Container Registry (GHCR)
- Image tagged with both `latest` and commit SHA
- Slack notification on deployment success/failure

## Project Structure

```text
experiment-9/
|-- Dockerfile
|-- docker-compose.yml
|-- .dockerignore
|-- .github/
|   |-- workflows/
|       |-- ci.yml
|       |-- cd.yml
|-- client/
|   |-- Dockerfile
|   |-- nginx.conf
|   |-- package.json
|   |-- src/
```

## Experiment 3.2.1: Dockerize React with Multi-Stage Build

### Build Image

From `experiment-9` root:

```bash
docker build -t experiment-3-2-react:latest .
```

### Run Container on Port 8080

```bash
docker run --rm -p 8080:80 experiment-3-2-react:latest
```

Open:

- http://localhost:8080

### Optional: Pass Environment Variable at Build Time

```bash
docker build --build-arg VITE_API_URL=https://api.example.com -t experiment-3-2-react:latest .
```

### Run with Docker Compose

```bash
docker compose up --build
```

Open:

- http://localhost:8080

## Experiment 3.2.2: CI/CD with GitHub Actions

### CI Workflow

File: `.github/workflows/ci.yml`

- Trigger: `pull_request` to `main` or `develop`
- Steps:
  - Checkout code
  - Install dependencies (`npm ci`)
  - Run tests (`npm test`)
  - Build app (`npm run build`)

### CD Workflow

File: `.github/workflows/cd.yml`

- Trigger: `push` to `main`
- Logs into GHCR (`ghcr.io`)
- Builds and pushes Docker image for React app
- Tags image as:
  - `latest`
  - short commit SHA
- Sends Slack notification:
  - success notification when deployment succeeds
  - failure notification when deployment fails

### Required GitHub Secrets

Add these in GitHub repository settings:

- `SLACK_WEBHOOK_URL` (Incoming Webhook URL from Slack app)

No Docker Hub secret is required because this pipeline pushes to GHCR using `GITHUB_TOKEN`.

### GHCR Image Name

CD publishes to:

- `ghcr.io/<github-username>/experiment-9-react:latest`
- `ghcr.io/<github-username>/experiment-9-react:<sha>`

## Verify Image Size

```bash
docker images | findstr experiment-3-2-react
```

Expected: final image should be well under 100 MB due to multi-stage build and Nginx alpine runtime.

## Notes

- For `npm ci`, commit `package-lock.json` in `client/`.
- React environment variables are build-time values in this setup.
- Nginx configuration includes gzip and cache headers for static files.
