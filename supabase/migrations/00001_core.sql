-- Hous Panel core schema. One multi-tenant project for all Hous Sites clients;
-- solhous.com is tenant #1.

create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  domain text,
  plan text not null default 'care' check (plan in ('care','care_plus','lapsed','internal')),
  status text not null default 'active' check (status in ('active','suspended')),
  revalidate_url text,
  revalidate_secret text,
  created_at timestamptz default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  client_id uuid references clients(id),
  role text not null default 'client' check (role in ('studio','client')),
  email text not null,
  display_name text,
  created_at timestamptz default now()
);

create table site_content (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  section_key text not null,
  content jsonb not null,
  updated_at timestamptz default now(),
  updated_by uuid references profiles(id),
  unique (client_id, section_key)
);

create table media (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  storage_path text not null,
  alt text,
  width int,
  height int,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table business_hours (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  day smallint not null check (day between 0 and 6),
  open text,
  close text,
  closed boolean default false,
  note text,
  unique (client_id, day)
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  title text not null,
  body text,
  starts_at timestamptz,
  ends_at timestamptz,
  active boolean default true,
  created_at timestamptz default now()
);

create table form_submissions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id),
  form_key text not null,
  payload jsonb not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table activity_log (
  id bigint generated always as identity primary key,
  client_id uuid not null references clients(id),
  actor uuid,
  action text not null,
  target text,
  created_at timestamptz default now()
);
