# URL Shortener

A deliberately simple URL shortener used as a vehicle for learning infrastructure concepts in public.

Two endpoints. That's the whole app:
- `POST /shorten` — takes a URL, returns a slug
- `GET /:slug` — redirects to the original URL

The product is trivial so that every phase of development is unambiguously about one infrastructure concept. See [vision.md](vision.md) for the full framing and [ROADMAP.md](ROADMAP.md) for concrete milestones.

---

## Current Phase

**Phase 1 — Baseline: Hono + Postgres + Swagger** 🔄

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Server | Hono |
| API Docs | Zod OpenAPI + Swagger UI |
| ORM | Drizzle |
| Database | PostgreSQL |
| Cache / Rate Limiting | Redis (Phase 2+) |
| Reverse Proxy / LB | Caddy |
| Hosting | Hetzner VPS |
| Metrics | Prometheus (Phase 5+) |
| Logs | Loki (Phase 5+) |
| Traces | Tempo (Phase 5+) |
| Visualization | Grafana (Phase 5+) |
| Instrumentation | OpenTelemetry (Phase 5+) |

---

## Local Development

**Prerequisites:** Bun, Docker

```sh
# Install dependencies
bun install

# Start Postgres (and Redis once Phase 2 begins)
docker compose up -d

# Copy and fill in environment variables
cp .env.example .env

# Run migrations
bun run db:migrate

# Start dev server with hot reload
bun run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) for the Swagger UI.

---

## Project Structure

```
src/
  index.ts          # App entry point and route registration
  db/
    schema.ts       # Drizzle schema
    migrations/     # Generated migration files
  lib/
    redis.ts        # Redis client (Phase 2+)
  middleware/
    rateLimit.ts    # Rate limiting middleware (Phase 3+)
```

---

## Docs

- [vision.md](vision.md) — what this project is and why
- [ROADMAP.md](ROADMAP.md) — concrete milestones and deployment steps per phase
- [BLOG_POSTS.md](BLOG_POSTS.md) — blog post outlines for each phase
