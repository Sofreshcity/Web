-- So Fresh City: initial schema
-- Public forms are submitted through the `submit-form` edge function (service role),
-- so no anonymous INSERT policies exist on the submission tables.

create extension if not exists pgcrypto;

-- ---------- admin access ----------
create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

create policy "admins can see admin list"
  on public.admin_users for select
  using (public.is_admin());

-- ---------- events ----------
create type public.event_status as enum ('draft', 'published', 'cancelled');

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 140),
  description text,
  city text not null check (city in ('San Francisco', 'Oakland', 'Alameda County', 'Other')),
  venue text,
  address text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  status public.event_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index events_status_starts_idx on public.events (status, starts_at);
alter table public.events enable row level security;

create policy "anyone can read published events"
  on public.events for select
  using (status = 'published');

create policy "admins manage events"
  on public.events for all
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.touch_updated_at()
returns trigger language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger events_touch before update on public.events
  for each row execute function public.touch_updated_at();

-- ---------- submissions ----------
create type public.submission_status as enum ('new', 'in_progress', 'done', 'archived');

create table public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone text,
  city text,
  interests text[] not null default '{}',
  availability text,
  message text check (char_length(message) <= 2000),
  status public.submission_status not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.volunteer_signups enable row level security;
create policy "admins manage volunteer signups"
  on public.volunteer_signups for all
  using (public.is_admin()) with check (public.is_admin());

create table public.service_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text,
  email text check (email is null or email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  preferred_city text,
  service text not null check (service in ('haircut', 'hygiene', 'advocacy', 'other')),
  message text check (char_length(message) <= 2000),
  consent_to_contact boolean not null default false,
  status public.submission_status not null default 'new',
  created_at timestamptz not null default now(),
  check (phone is not null or email is not null)
);
alter table public.service_requests enable row level security;
create policy "admins manage service requests"
  on public.service_requests for all
  using (public.is_admin()) with check (public.is_admin());

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text,
  message text not null check (char_length(message) between 5 and 4000),
  status public.submission_status not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "admins manage contact messages"
  on public.contact_messages for all
  using (public.is_admin()) with check (public.is_admin());
