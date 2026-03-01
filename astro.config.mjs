// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repo.endsWith('.github.io');

// https://astro.build/config
export default defineConfig({
  site: isGitHubPagesBuild
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : undefined,
  base: isGitHubPagesBuild && !isUserSite ? `/${repo}` : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});
