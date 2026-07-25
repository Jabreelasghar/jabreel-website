insert into public.organisations (
  id,
  name,
  slug,
  timezone,
  settings
)
values (
  '00000000-0000-4000-8000-000000000101',
  'ThinkLab Demonstration Organisation',
  'thinklab-demonstration',
  'Asia/Dubai',
  '{"purpose":"milestone-1-demonstration"}'::jsonb
)
on conflict (slug) do update
set name = excluded.name,
    timezone = excluded.timezone,
    settings = excluded.settings;
