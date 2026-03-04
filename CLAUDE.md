# CLAUDE.md — Project Conventions

## What This Project Is

A URL shortener built phase-by-phase as a learning-in-public blog series. Each phase introduces one infrastructure concept. The running themes: measure before optimizing, show the failure before the fix.

See [ROADMAP.md](ROADMAP.md) for the full phase plan.

---

## Branching Strategy

**`main`** = the most recently completed and published phase. Always deployable.

**`phase/N-name`** = active development branch for the next phase. Branch off `main`.

**Tags** = permanent snapshots at each phase completion. Format: `vN-short-name` (e.g., `v1-baseline`, `v2-redis-cache`).

### Workflow per phase

```
git checkout -b phase/N-name        # start new phase
# ... build, deploy, measure, write post ...
# open PR → merge to main
git tag vN-short-name               # tag the merge commit on main
git push origin vN-short-name       # push tag
```

Blog posts link to the PR (diff = what changed) and the tag (full state at that phase).

---

## What Lives on `main`

Everything, including deployment config (`Caddyfile`, `docker-compose.yml`). If we migrate away from Caddy or Docker later, we update or delete those files then.

---

## Repo Conventions

- **`drafts/`** — blog post drafts. Gitignored, never committed.
- **`ROADMAP.md`** — phase tracking. Update status and check off tasks as work completes.
- **AI transparency** — implementation may be AI-scaffolded. All measurements, chaos experiments, and deployment observations must be hands-on and real.
