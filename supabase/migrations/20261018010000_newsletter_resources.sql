-- Newsletter subscribers (written only by the submit-form edge function)
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  unsubscribe_token uuid not null default gen_random_uuid() unique,
  source text,
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);
create unique index newsletter_subscribers_email_key on public.newsletter_subscribers (lower(email));
alter table public.newsletter_subscribers enable row level security;
create policy "admins manage subscribers"
  on public.newsletter_subscribers for all
  using (public.is_admin()) with check (public.is_admin());

-- Local resources, grouped on the site by county then category
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  county text not null check (county in ('San Francisco', 'Alameda')),
  category text not null check (category in ('housing', 'employment', 'food', 'health', 'mental_health', 'legal', 'reentry', 'id_documents', 'other')),
  name text not null check (char_length(name) between 2 and 160),
  description text check (char_length(description) <= 1000),
  phone text,
  email text,
  website text check (website is null or website ~* '^https?://'),
  address text,
  hours text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index resources_county_category_idx on public.resources (county, category, sort_order, name);
alter table public.resources enable row level security;

create policy "anyone can read published resources"
  on public.resources for select
  using (published);

create policy "admins manage resources"
  on public.resources for all
  using (public.is_admin()) with check (public.is_admin());

create trigger resources_touch before update on public.resources
  for each row execute function public.touch_updated_at();
