# Opciones de Despliegue para tu Portafolio

Tu portafolio tiene un **formulario de contacto con ruta API** que requiere procesamiento del lado del servidor. Aquí están tus opciones:

## ⚠️ Problema con GitHub Pages

GitHub Pages **solo soporta sitios estáticos** (HTML, CSS, JS). No puede ejecutar código del lado del servidor como tu ruta API `/api/contact`.

## ✅ Soluciones Recomendadas

### **OPCIÓN 1: Usar servicio de terceros (GRATIS) + GitHub Pages**

**Pros:**
- ✅ Gratis completamente
- ✅ Fácil de configurar (5 minutos)
- ✅ No requiere servidor
- ✅ Funciona perfectamente en GitHub Pages

**Servicios recomendados:**
1. **FormSubmit.co** (MÁS FÁCIL - sin registro)
   - Solo cambias la URL del formulario a `https://formsubmit.co/tu-email@example.com`
   - Recibes emails directamente
   
2. **Formspree.io** (con cuenta gratuita)
   - 50 envíos/mes gratis
   - Panel de control

3. **EmailJS** (con cuenta gratuita)
   - 200 emails/mes gratis
   - Integración con Gmail, Outlook, etc.

**Pasos para FormSubmit (lo más rápido):**
```astro
<!-- En tu componente de formulario -->
<form action="https://formsubmit.co/TU_EMAIL@example.com" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  
  <!-- Campos opcionales de FormSubmit -->
  <input type="hidden" name="_subject" value="Nuevo mensaje desde portafolio">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_template" value="table">
  
  <button type="submit">Enviar</button>
</form>
```

---

### **OPCIÓN 2: Desplegar en Vercel/Netlify (GRATIS + más control)**

**Pros:**
- ✅ Totalmente gratis
- ✅ Soporte completo para rutas API
- ✅ Tu código actual funciona sin cambios
- ✅ HTTPS automático
- ✅ Despliegue automático desde GitHub

**Servicios:**
1. **Vercel** (recomendado para Astro)
   - Integración perfecta con Astro
   - Adaptador oficial: `@astrojs/vercel`
   
2. **Netlify**
   - Muy popular
   - Adaptador: `@astrojs/netlify`

**Pasos para Vercel:**
```bash
# 1. Instalar adaptador
npm install @astrojs/vercel

# 2. Actualizar astro.config.mjs
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  // ... resto de config
});

# 3. Subir a GitHub y conectar con Vercel
```

---

### **OPCIÓN 3: Azure Static Web Apps (GRATIS + APIs incluidas)**

**Pros:**
- ✅ Gratis
- ✅ Soporte para Azure Functions (APIs)
- ✅ Integración con GitHub Actions

---

## 📋 Mi Recomendación

**Para empezar RÁPIDO (5 minutos):**
→ **FormSubmit.co** + GitHub Pages

**Para MÁXIMO CONTROL (15 minutos):**
→ **Vercel** con adaptador Astro

---

## 🚀 Siguiente Paso

**Dime cuál prefieres y te ayudo a configurarlo:**

1. "Quiero usar FormSubmit" → Te configuro el formulario
2. "Quiero usar Vercel" → Te preparo todo para Vercel
3. "Quiero usar Netlify" → Te preparo todo para Netlify
4. "Quiero quedarme con GitHub Pages sin API" → Deshabilitamos el backend

¿Qué eliges?
