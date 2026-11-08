# Cloud sync setup (Supabase)

The app works offline first. Signing in only adds a copy of your progress in the cloud.

## 1. Create a free project

1. Go to <https://supabase.com> and sign in.
2. **New project** → pick a name and a strong database password → create.
3. Wait until the project finishes provisioning.

## 2. Create the table

1. Open **SQL Editor**.
2. Paste the contents of [`supabase.sql`](supabase.sql) and click **Run**.

That creates `public.progress` with row-level security, so each account can only read and write its own row.

## 3. Get the two public values

1. Open **Project Settings → API**.
2. Copy **Project URL** (looks like `https://abcdefgh.supabase.co`).
3. Copy **anon public** key.

Paste both into the app: **Report → Account → Connect cloud**.

## 4. Create an account

1. In the same card, enter an email and a password.
2. Tap **Sign up**.
3. Supabase sends a confirmation email. Open it, confirm, then tap **Sign in**.

> Tip: in **Authentication → Providers → Email** you can turn off *Confirm email*
> while testing, so sign-up logs you in immediately.

## 5. How syncing behaves

- Every change (XP, lessons, cards, speaking) is pushed about 1.5 s after you stop.
- On sign-in, local and cloud data are **merged**: lessons are unioned, XP/streak take the maximum,
  cards keep the most recent review. Nothing is deleted.
- Signing out keeps the local copy.
- If the connection fails, the app keeps working offline and shows *Sync failed*.

## Backup without an account

**Report → Account → Export backup** downloads a JSON file.
**Import backup** restores it on any device. Use this as a manual backup or before reinstalling.
