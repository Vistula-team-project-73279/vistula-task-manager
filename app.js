'use strict';
let config;
let tasks = [];
let editingId = null;
let busy = false;
const $ = (id) => document.getElementById(id);
function status(message, error = false) {
  $('status-message').textContent = message;
  $('status-message').dataset.error = String(error);
}
function setBusy(value) {
  busy = value;
  document.querySelectorAll('button').forEach(button => { button.disabled = value; });
}
async function api(query = '', method = 'GET', record) {
  const response = await fetch(`${config.supabaseUrl}/rest/v1/tasks${query}`, {
    method,
    headers: { apikey: config.supabasePublishableKey, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    ...(record === undefined ? {} : { body: JSON.stringify(record) })
  });
  const body = await response.text();
  let data;
  try { data = body ? JSON.parse(body) : null; } catch { throw new Error(`The server returned an invalid response (${response.status}).`); }
  if (!response.ok) throw new Error(data?.message || `Request failed (${response.status}).`);
  return data;
}
function resetForm() {
  editingId = null;
  $('task-form').reset();
  $('form-heading').textContent = 'Create a task';
  $('task-submit').textContent = 'Add task';
  $('cancel-edit').hidden = true;
}
function render() {
  const list = $('task-list');
  list.replaceChildren();
  if (!tasks.length) { const p = document.createElement('p'); p.textContent = 'No tasks yet. Add your first task to get started.'; list.append(p); }
  tasks.forEach(task => {
    const item = document.createElement('article');
    item.className = 'task-item'; item.dataset.id = String(task.id); item.dataset.completed = String(task.completed);
    [['h3', 'task-title', task.title], ['p', 'task-description', task.description || ''], ['p', 'task-status', task.completed ? 'Completed' : 'Incomplete']].forEach(([tag, cls, text]) => {
      const el = document.createElement(tag); el.className = cls; el.textContent = text; item.append(el);
    });
    const actions = document.createElement('div'); actions.className = 'actions';
    [['edit-task', 'Edit'], ['toggle-task', task.completed ? 'Mark incomplete' : 'Mark complete'], ['delete-task', 'Delete']].forEach(([cls, label]) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = cls; button.textContent = label; button.disabled = busy;
      button.addEventListener('click', () => act(cls, task)); actions.append(button);
    });
    item.append(actions); list.append(item);
  });
}
async function load() {
  const result = await api('?select=*&order=id.desc');
  if (!Array.isArray(result)) throw new Error('The server did not return a task list.');
  tasks = result; render();
}
async function run(operation) {
  if (busy) return;
  if (!config) { status('Configure config.json with your Supabase project URL and public publishable key, then refresh.', true); return; }
  setBusy(true);
  try { await operation(); } catch (error) { status(`Unable to complete the operation: ${error.message}`, true); }
  finally { setBusy(false); }
}
async function act(action, task) {
  if (busy) return;
  if (action === 'edit-task') {
    editingId = task.id; $('task-title').value = task.title; $('task-description').value = task.description || '';
    $('form-heading').textContent = 'Edit task'; $('task-submit').textContent = 'Save changes'; $('cancel-edit').hidden = false; $('task-title').focus(); return;
  }
  await run(async () => {
    const query = `?id=eq.${encodeURIComponent(task.id)}`;
    const changed = await api(query, action === 'delete-task' ? 'DELETE' : 'PATCH', action === 'delete-task' ? undefined : { completed: !task.completed });
    if (!Array.isArray(changed) || !changed.length) throw new Error('This task no longer exists or database permissions prevent changes. Refresh the list.');
    if (action === 'delete-task' && editingId === task.id) resetForm();
    status('Change saved. Refreshing tasks…'); await load(); status('Tasks are up to date.');
  });
}
$('task-form').addEventListener('submit', event => {
  event.preventDefault();
  const title = $('task-title').value.trim();
  if (!title) { status('Please enter a task title.', true); $('task-title').focus(); return; }
  const record = { title, description: $('task-description').value.trim() };
  run(async () => {
    const result = await api(editingId === null ? '' : `?id=eq.${encodeURIComponent(editingId)}`, editingId === null ? 'POST' : 'PATCH', record);
    if (!Array.isArray(result) || !result.length) throw new Error('No task was saved. Check database permissions and refresh.');
    resetForm(); status('Task saved. Refreshing tasks…'); await load(); status('Tasks are up to date.');
  });
});
$('cancel-edit').addEventListener('click', resetForm);
$('refresh-tasks').addEventListener('click', () => run(async () => { await load(); status('Tasks are up to date.'); }));
(async () => {
  setBusy(true);
  try {
    const response = await fetch('config.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Cannot load config.json.');
    const settings = await response.json();
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(settings.supabaseUrl) || !settings.supabasePublishableKey?.startsWith('sb_publishable_') || settings.tableName !== 'tasks') throw new Error('Set your Supabase project URL and public sb_publishable_ key in config.json. tableName must be tasks.');
    settings.supabaseUrl = settings.supabaseUrl.replace(/\/$/, ''); config = settings;
    await load(); status('Tasks are up to date.');
  } catch (error) { status(error.message, true); }
  finally { setBusy(false); }
})();
