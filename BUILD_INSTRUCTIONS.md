# Instrucciones de Build y Despliegue

Este proyecto está configurado para desplegarse tanto en **GitHub Pages** como en **AWS** (u otros servicios).

## 📦 Builds

### Para AWS (u otros servicios en la raíz)
```bash
npm run build:aws
```
- Genera el build en `dist/` con base path `/`
- Los archivos CSS, JS e imágenes se cargan desde la raíz

### Para GitHub Pages
```bash
npm run build:github
```
- Genera el build en `dist/` con base path `/formulario_astro`
- Compatible con GitHub Pages en https://miguelangellh.github.io/formulario_astro

### Build genérico (usa valores por defecto)
```bash
npm run build
```
- Por defecto usa base path `/` (AWS)

## 🚀 Despliegue

### AWS (S3 + CloudFront / Amplify / Elastic Beanstalk)

1. **Build para AWS:**
   ```bash
   npm run build:aws
   ```

2. **Subir a S3 (ejemplo):**
   ```bash
   aws s3 sync dist/ s3://tu-bucket-name --delete
   aws cloudfront create-invalidation --distribution-id TU_DISTRIBUTION_ID --paths "/*"
   ```

3. **Con AWS Amplify:**
   - Conecta tu repositorio
   - Comando de build: `npm run build:aws`
   - Directorio de salida: `dist`

### GitHub Pages

1. **Build para GitHub:**
   ```bash
   npm run build:github
   ```

2. **Desplegar:**
   ```bash
   # Opción 1: GitHub Actions (automático en push a main)
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main

   # Opción 2: Manual con gh-pages
   npm install -g gh-pages
   gh-pages -d dist
   ```

## 🔧 Variables de Entorno

El proyecto usa `PUBLIC_DEPLOY_TARGET` para determinar la configuración:

- `PUBLIC_DEPLOY_TARGET=github` → base: `/formulario_astro`
- `PUBLIC_DEPLOY_TARGET=aws` o vacío → base: `/`

## ⚠️ Solución de Problemas

### Error 404 en recursos (CSS/JS/imágenes)

**Síntoma:** La página carga pero sin estilos ni scripts

**Causa:** Base path incorrecto para el ambiente

**Solución:**
- Para AWS: usa `npm run build:aws`
- Para GitHub: usa `npm run build:github`

### Las rutas no funcionan en AWS

- Verifica que estás usando `build:aws`
- En S3, configura "Index document" y "Error document" ambos como `index.html`
- En CloudFront, configura custom error response para 404 → 200 → /index.html

### Las rutas no funcionan en GitHub Pages

- Verifica que estás usando `build:github`
- Asegúrate de que el repositorio se llama `formulario_astro`
- GitHub Pages debe estar configurado para servir desde la rama `gh-pages` o carpeta `/docs`

## 🧪 Probar localmente

Después de hacer un build, puedes probar localmente:

```bash
npm run build:aws
npm run preview
```

O para GitHub Pages:
```bash
npm run build:github
npm run preview
```
