-- Enable UUID generator
create extension if not exists "pgcrypto";

-- Main buyers table
create table public.buyers (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null,
  source        text,
  name          text,
  email         text unique,
  phone         text unique,
  markets       text[],            -- e.g. {Riverside,SanBernardino}
  asset_types   text[],            -- {land,sfr}
  budget_min    int,
  budget_max    int,
  tags          text[],
  status        text default 'new',-- new | qualifying | qualified | inactive
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create index on buyers using gin (markets);
create index on buyers using gin (asset_types);
create index on buyers (owner_id);

-- Row-level security so every user sees only their own rows
alter table buyers enable row level security;

create policy "Owners can CRUD own buyers"
  on buyers
  for all
  using  (owner_id = auth.uid())
  with check (owner_id = auth.uid());

