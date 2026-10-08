# CODM Loadout Hub — Supabase Edition

## Setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `schema.sql`.
3. Go to **Authentication → Users → Add user** and create the admin email/password.
4. Copy the new user's UUID.
5. In SQL Editor run:
   ```sql
   insert into public.admin_users (user_id)
   values ('YOUR-AUTH-USER-UUID');
   ```
6. Open `supabase.js` and replace:
   ```js
   const SUPABASE_URL = "YOUR_SUPABASE_URL";
   const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
   ```
   with your Supabase Project URL and **Publishable/anon key**.
7. Open the main site. Click **Admin Login**.
8. Sign in with the Supabase user you created.
9. Add a weapon/config. It will be inserted directly into Supabase.

## Security

The public site can read weapons/configs. Only authenticated users whose UUID exists in `admin_users` can insert, update, or delete.

Never put the Supabase `service_role`/secret key in browser JavaScript.

## Important

The Admin page no longer uses localStorage as its database. Add/delete operations go directly to Supabase.
