# Deployment Guide: Free & Easy on Vercel + Neon

This application was specifically architected to be deployed 100% for free using modern serverless infrastructure. You don't need any credit card.

## Prerequisites
1. A GitHub account.
2. A free Vercel account (login with GitHub).
3. A free Neon Postgres account (login with GitHub).

## Step 1: Push Code to GitHub
1. Create a new repository on GitHub (make it private or public).
2. Open terminal in this project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

## Step 2: Setup Free PostgreSQL Database (Neon)
1. Go to [neon.tech](https://neon.tech) and create a free project.
2. Once created, you will see a connection string in the dashboard (looks like `postgresql://neondb_owner:***@ep-***.aws.neon.tech/neondb?sslmode=require`).
3. Copy this string.

## Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
2. Import the GitHub repository you just created.
3. In the "Configure Project" screen, open the **Environment Variables** section.
4. Add the following variable:
   - **Key**: `DATABASE_URL`
   - **Value**: `[Paste your Neon connection string here]`
5. Click **Deploy**.

Vercel will automatically build the project (`npm run build`).

## Step 4: Seed the Database (Important)
Once deployed, your database is empty. You need to run the Prisma seed script to populate it with colleges and cutoffs.

1. In your local terminal, temporarily change the `DATABASE_URL` in your `.env` file to the Neon connection string.
2. Run the command to sync schema:
   ```bash
   npx prisma db push
   ```
3. Run the command to seed data:
   ```bash
   npx prisma db seed
   ```

*(Alternatively, Vercel supports running a `postinstall` script, but doing it once locally is safer and guarantees the data is there.)*

## Step 5: Test
Visit the URL provided by Vercel (e.g. `your-repo-name.vercel.app`). The app is now live, fully functional, and using a live Postgres database!
