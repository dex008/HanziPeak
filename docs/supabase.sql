-- HanziPeak cloud progress table
-- Run this once in the Supabase SQL editor.

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "Own progress only" on public.progress;

create policy "Own progress only"
  on public.progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
