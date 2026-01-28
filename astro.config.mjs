// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Configuración dinámica que se adapta automáticamente:
// - Detecta GitHub Actions (CI=true + GITHUB_ACTIONS=true) → usa base '/formulario_astro/'
// - Variable explícita PUBLIC_DEPLOY_TARGET='github' → usa base '/formulario_astro/'
// - Por defecto (local o AWS) → usa base '/'
const isGitHubActions = process.env.CI === 'true' && process.env.GITHUB_ACTIONS === 'true';
const isGitHubPages = process.env.PUBLIC_DEPLOY_TARGET === 'github' || isGitHubActions;

export default defineConfig({
	output: 'static',
	site: isGitHubPages 
		? 'https://miguelangellh.github.io'
		: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
	base: isGitHubPages ? '/formulario_astro/' : '/',
});
