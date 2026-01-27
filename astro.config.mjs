// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Configuración para GitHub Pages:
// - output: 'static' es necesario para GitHub Pages
// - site: URL completa del sitio
// - base: '/formulario_astro' siempre (consistente en dev y prod)
export default defineConfig({
	output: 'static',
	site: 'https://miguelangellh.github.io',
	base: '/formulario_astro',
});
