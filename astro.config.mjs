// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Configuración dinámica:
// - Para GitHub Pages: usa base '/formulario_astro'
// - Para AWS u otros: usa base '/'
// Usa la variable de entorno PUBLIC_DEPLOY_TARGET para determinar el ambiente
const isGitHubPages = process.env.PUBLIC_DEPLOY_TARGET === 'github';

export default defineConfig({
	output: 'static',
	site: isGitHubPages 
		? 'https://miguelangellh.github.io'
		: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
	base: isGitHubPages ? '/formulario_astro' : '/',
});
