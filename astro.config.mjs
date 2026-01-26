// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Configuración para GitHub Pages:
// - Usa `SITE` y `BASE_PATH` si están definidos en entorno (GitHub Actions).
// - Si no están definidos, funciona en desarrollo con valores por defecto.
export default defineConfig({
	site: process.env.SITE || undefined,
	base: process.env.BASE_PATH || '/',
});
