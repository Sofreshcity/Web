# So Fresh City website

Vite + React + Tailwind frontend, Supabase (database, auth, edge function), Resend (email), Cloudflare Pages (hosting).

## How it fits together

- **Public forms** (volunteer, service request, contact) POST to the `submit-form` edge function. It validates, saves with the service role, and sends emails through Resend. The tables have no anonymous write access.
- **Events** are read directly from Supabase (only `published` rows are public).
- **Admin** (`/admin`) signs in with Supabase Auth; only users listed in `admin_users` can read or edit anything.
- **Donate** links out to your processor via `VITE_DONATE_URL`.

## Local development

```bash
cp .env.example .env.local   # fill in the Supabase URL and publishable key
npm install
npm run dev
```

## Supabase setup

1. Schema: `supabase/migrations/20261018000000_init.sql` (already applied to the "Web" project).
2. Auth → turn off "Allow new users to sign up". Create staff users in Auth → Users.
3. Make a user an admin (replace the email):
   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.org';
   ```
4. Edge function secrets (Project Settings → Edge Functions → Secrets):
   - `RESEND_API_KEY`: from Resend
   - `FROM_EMAIL`: e.g. `So Fresh City <hello@mail.yourdomain.org>` (domain must be verified in Resend)
   - `NOTIFY_EMAIL`: where staff notifications go
   - `ALLOWED_ORIGINS`: e.g. `https://yourdomain.org,https://your-project.pages.dev`
   Until `RESEND_API_KEY` and `FROM_EMAIL` are set, submissions are still saved; emails are skipped.
5. Deploy the function with `supabase functions deploy submit-form --no-verify-jwt`.

## Resend

1. Add and verify a sending domain (a subdomain such as `mail.yourdomain.org` keeps it separate from your regular mailboxes).
2. Add the SPF/DKIM records Resend shows you in Cloudflare DNS (set them to DNS only, not proxied).
3. Optional: use Resend SMTP in Supabase Auth settings so staff login emails come from your domain too.

## Cloudflare Pages

1. Create a Pages project from this repo.
2. Build command `npm run build`, output directory `dist`.
3. Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and optionally `VITE_DONATE_URL`, `VITE_CONTACT_EMAIL`.
4. Add your custom domain. `public/_redirects` handles client-side routing.
