-- Waitlist for the 2027-season paid launch. Run once in the Supabase SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste -> Run). Safe to re-run.
--
-- The browser only ever INSERTs: the publishable key in src/lib/supabase.js is
-- public, so anyone can call it. Row-level security is what keeps the list from
-- being read back — there is deliberately NO select/update/delete policy, so the
-- emails can be read only from the dashboard (Table Editor) or with the service
-- role key, never from the site.

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  source     text,                       -- utm_source, else referrer host, else 'direct'
  campaign   text,                       -- utm_campaign, if any
  created_at timestamptz not null default now(),
  constraint waitlist_email_len    check (char_length(email) <= 254),
  constraint waitlist_email_format check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]{2,}$'),
  constraint waitlist_source_len   check (source is null or char_length(source) <= 100),
  constraint waitlist_campaign_len check (campaign is null or char_length(campaign) <= 100)
);

-- One row per address, case-insensitively. The site treats the resulting
-- unique-violation (23505) as "you're already on the list", not as an error.
create unique index if not exists waitlist_email_lower_idx
  on public.waitlist (lower(email));

alter table public.waitlist enable row level security;

drop policy if exists "anyone can join the waitlist" on public.waitlist;
create policy "anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);
