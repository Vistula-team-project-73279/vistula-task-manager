# Task Manager

Vistula Team Project — Practical Assignment 1. Student ID: **73279**.

Vanilla HTML, CSS and JavaScript with Supabase PostgreSQL and its REST API. Supports viewing, adding, editing, completing and deleting shared demonstration tasks. No login or build step is required.

## Deployment status

Source uploaded. Supabase configuration, GitHub Pages deployment and both partner PRs are still pending. This is not yet a deployed assignment.

Required course username: `vistula-team-project-73279`.
Current account supplied by the student: `RaufJumshudov73279` (not renamed).

Repository: https://github.com/RaufJumshudov73279/vistula-task-manager

Application URL after Pages is enabled: https://RaufJumshudov73279.github.io/vistula-task-manager/

The repository exists. The application URL is not yet a verified deployment. The current account does not meet the assignment's account naming rule.

## Database setup

1. Create a separate demonstration Supabase project.
2. Run `supabase.sql` in its SQL Editor. The four RLS policies permit public demo CRUD; do not store personal or sensitive data.
3. In `config.json`, set `supabaseUrl` to the project's HTTPS URL and `supabasePublishableKey` to its public `sb_publishable_...` key. Keep `tableName` as `tasks`.
4. Never put a secret key, service-role key or password in this repository.

## GitHub Pages

Create a public repository named exactly `vistula-task-manager`. Upload this directory's contents to the root of `main` (not as a nested directory). In Settings → Pages choose Deploy from a branch, `main`, `/ (root)`, Save. Wait for deployment to finish.

For local preview use a static HTTP server, for example `npx --yes http-server .`; opening index.html via file:// cannot reliably load config.json.

## REST API

The application uses `fetch`, the public `apikey` header and `/rest/v1/tasks`: GET with `select=*`, POST to create, PATCH with `id=eq.ID` to edit/toggle, DELETE with `id=eq.ID` to remove. Supabase publishable keys are sent as API keys, not bearer JWTs. Data is rendered with textContent to prevent HTML injection.

## Partner collaboration — pending

Partner repository: https://github.com/vistula-team-project-73746/vistula-task-manager

- Outgoing merged PR (author student 73279): PENDING.
- Incoming merged PR (author student 73746): PENDING.

The actual partner must create contribution.html and contribution.json in this repository through their own PR. They must put **73746** in contributorStudentId. Do not copy your outgoing files into your own repository.

Prepared outgoing files are supplied separately in `partner-pr-73279` beside this project. Fork the partner repository from your own course account, branch `feature/team-contribution-73279`, copy those two files to its root, commit and open a PR targeting the partner's main. The partner must review and merge it. Review and merge the partner's incoming PR in your own repository. Replace both PENDING entries with the real merged PR URLs.

## Acceptance checks

After configuring and deploying: load the task list; add a task; refresh and verify persistence; edit title and description; mark complete and incomplete; delete and refresh. Check useful error messages with the network disconnected. Verify the contribution link after the incoming PR is merged; click Show Contributor and verify 73746. Check contribution.json directly and confirm both PR URLs in this README.

Submit only the verified live main application URL in Platon after all checks pass.
