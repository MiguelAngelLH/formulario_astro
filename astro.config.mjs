// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Configuración para GitHub Pages:
// - Usa `SITE` y `BASE_PATH` si están definidos en entorno (GitHub Actions).
// - Si no están definidos, funciona en desarrollo con valores por defecto.
// - output: 'static' es necesario para GitHub Pages
export default defineConfig({
	output: 'static',
	site: process.env.SITE || undefined,
	base: process.env.BASE_PATH || '/',
});
