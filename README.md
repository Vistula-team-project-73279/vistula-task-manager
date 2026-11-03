# Task Manager

Vistula Team Project — Practical Assignment 1. Student ID: **73279**.

## Public resources

- Application: https://vistula-team-project-73279.github.io/vistula-task-manager/
- Repository: https://github.com/Vistula-team-project-73279/vistula-task-manager
- Contributor page: https://vistula-team-project-73279.github.io/vistula-task-manager/contribution.html
- Contributor JSON: https://vistula-team-project-73279.github.io/vistula-task-manager/contribution.json

## Functionality

HTML, CSS and JavaScript frontend using the Supabase REST API and PostgreSQL. Display, add, edit, complete/uncomplete and delete tasks. Changes persist after refresh. Required DOM IDs and classes are included. Errors are displayed in status-message. Text is rendered with textContent.

## Database and deployment

The tasks table has an automatically generated BIGINT primary key, required title, optional description and completed BOOLEAN default false. RLS is enabled with public demonstration CRUD policies. Use test data only: visitors share the same task table.

config.json contains only the project URL and public publishable key; tableName is tasks. Never publish database passwords, secret keys or service-role keys. supabase.sql documents schema setup for a separate demo project.

GitHub Pages publishes from main, root. No backend server or build step is needed. API requests use fetch with the apikey header: GET /tasks?select=*, POST /tasks, PATCH /tasks?id=eq.ID and DELETE /tasks?id=eq.ID.

## Team collaboration

- Incoming contribution by student **73746**, reviewed and merged: https://github.com/Vistula-team-project-73279/vistula-task-manager/pull/1
- Outgoing contribution by student **73279**: https://github.com/vistula-team-project-73746/vistula-task-manager/pull/1 — awaiting the partner's review and merge.

The incoming PR added contribution.html and contribution.json. Show Contributor fetches the JSON and displays 73746. The outgoing PR adds the same feature to the partner repository with ID 73279; it must be merged by the partner to complete Part B.

## Validation

Verified on the deployed site: loading from Supabase, creation, persistence after refresh, editing title and description, and completion in both directions. Local mocked API checks also cover deletion, network error reporting and required DOM IDs. See the collaboration status above before submitting only the application URL in Platon.
