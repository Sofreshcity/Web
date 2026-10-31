create table if not exists public.collaborator_feedback (
 id uuid primary key default gen_random_uuid(),
 organization_name text not null,
 representative_name text not null,
 event_date date not null,
 city text not null,
 event_success integer not null check (event_success between 1 and 10),
 recommend text not null check (recommend in ('Yes','No')),
 professionalism integer not null check (professionalism between 1 and 10),
 comments text,
 submitted_at timestamptz not null default now()
);
alter table public.collaborator_feedback enable row level security;
-- No public policies: only the service-role edge function can insert/read.
