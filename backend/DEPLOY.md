# G-LIGHT backend: update and deploy guide

Do **Part 1** first (your laptop). Do **Part 2** when you are ready to go live.

---

## Part 1: Update the backend on your laptop

Open a terminal **inside the `backend` folder** and make sure your virtual environment is active (you should see `(venv)` or similar at the start of the line).

1. Install the new packages:

   ```
   pip install -r requirements.txt
   ```

2. Create the database changes:

   ```
   python manage.py makemigrations gallery contact
   python manage.py migrate
   ```

3. Move any photos you already uploaded onto the new capability list:

   ```
   python manage.py fix_categories
   ```

4. Start the server and open the admin:

   ```
   python manage.py runserver
   ```

   Go to `http://127.0.0.1:8000/admin/`. You will now see:

   - **Projects** (name, capability, location, year, system size, description, main photo, extra photos, Featured, Published)
   - **Leads** (every Start a project request, with a status you can change from the list: New, Contacted, Quoted, Negotiation, Won, Completed, Lost)
   - **Home page numbers** (the 10+ / 5+ / 100+ figures; edit them here with no code change)

5. Test the site: with `npm run dev` running, send a request from the Start a project page and check it appears under **Leads**.

> If `makemigrations` or `migrate` shows an error, send me the full message.

---

## Part 2: Put the backend live (Render + Supabase)

Your website stays on Vercel. Only the backend goes to Render.

### A. Supabase (database and photo storage)

1. Create a project at supabase.com. Save the **database password** you choose.
2. **Database connection:** Project Settings > Database > Connection string > choose **Session pooler**. Copy it and replace `[YOUR-PASSWORD]` with your password. This becomes `DATABASE_URL`.
3. **Photo bucket:** Storage > New bucket > name it `projects` > turn **Public bucket ON**.
4. **Storage keys:** Storage > S3 Connection > New access key. Copy the **Access key ID** and **Secret access key** (the secret is shown once). Note the **Region** shown on that page.
5. Your **project reference** is the `xxxxxxxx` part of `https://xxxxxxxx.supabase.co`.

### B. GitHub

Push your project (frontend and backend folders) to GitHub. The `.gitignore` in `backend` already keeps your local database, photos and passwords out. Put `render.yaml` at the **top level** of the repository, next to the `backend` and `frontend` folders.

### C. Render

1. render.com > New > **Blueprint** > pick your repository. Render reads `render.yaml`.
2. Fill in the values it asks for (see `.env.example` for what each one is):
   `CORS_ALLOWED_ORIGINS`, `DATABASE_URL`, the four `SUPABASE_*` values plus `SUPABASE_S3_REGION`, and the three `DJANGO_SUPERUSER_*` values (this becomes your admin login).
3. Deploy. The first build takes a few minutes. It installs everything, prepares the database and creates your admin user.
4. When it finishes, open `https://YOUR-SERVICE.onrender.com/admin/` and log in.

### D. Connect the website

1. Vercel > your project > Settings > Environment Variables > add
   `VITE_API_BASE` = `https://YOUR-SERVICE.onrender.com` (no slash at the end).
2. Redeploy the site on Vercel.
3. Add a project with a photo in the live admin and check it appears on the live site.

### Things to know

- **Free Render sleeps** after about 15 minutes idle, so the first visit afterwards can take 30 to 60 seconds. The paid plan removes this.
- **Free Supabase pauses** a project after about a week with no activity. The paid plan removes this.
- **Photos** are stored in Supabase, so they survive restarts and redeploys.
- **Domain later:** add it in Vercel, then put the new address in `CORS_ALLOWED_ORIGINS` on Render. No code changes are needed.
- **Lead emails (optional):** set the `EMAIL_*` and `LEAD_NOTIFY_EMAIL` variables in `.env.example` and each new lead is also emailed.
