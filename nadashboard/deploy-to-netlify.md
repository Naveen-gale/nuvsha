# Deploying NAdashboard to Netlify

This guide provides step-by-step instructions for deploying your NAdashboard application to Netlify.

## Prerequisites
- A GitHub, GitLab, or Bitbucket account where your code is hosted.
- A free [Netlify](https://www.netlify.com/) account.
- The `netlify.toml` file is already added to this project's root folder, which handles the build configuration and SPA redirects for you.

## Step 1: Push your code to a Git repository
If you haven't already, push your `nadashboard` code to a repository on GitHub, GitLab, or Bitbucket.

## Step 2: Connect to Netlify
1. Log in to your Netlify account.
2. Click on **Add new site** and select **Import an existing project**.
3. Choose your Git provider (GitHub, GitLab, or Bitbucket) and authorize Netlify.
4. Select your `nadashboard` repository from the list.

## Step 3: Configure Build Settings
Netlify will automatically detect the settings from the `netlify.toml` file we provided. Verify that the settings look like this:
- **Base directory**: `nadashboard` (If your dashboard is inside a subfolder of a larger monorepo. If `nadashboard` is the root of your repo, leave this blank).
- **Build command**: `npm run build`
- **Publish directory**: `nadashboard/dist` (or just `dist` if `nadashboard` is the root).

## Step 4: Deploy!
1. Click the **Deploy site** button.
2. Netlify will begin building your Nuvsha application. You can view the build logs to monitor the progress.
3. Once the build finishes, Netlify will provide you with a live URL where your dashboard is hosted!

## Important Notes for Nuvsha Apps
Since Nuvsha uses client-side routing, the `netlify.toml` file automatically ensures all route requests fallback to `index.html`. This prevents 404 errors when refreshing a page like `/analytics` directly from the browser.
