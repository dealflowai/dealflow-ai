alter table public.buyers
  alter column owner_id type text
  using owner_id::text;

