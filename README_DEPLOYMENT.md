# ✅ Configuración Completa para GitHub Pages + FormSubmit

## 🎉 ¡Tu portafolio está listo para GitHub Pages!

### ✨ Qué se configuró:

1. **FormSubmit.co** - Formulario de contacto funcional
   - Los mensajes llegarán a: `miguelhdez0903@gmail.com`
   - Sin necesidad de servidor ni configuración adicional
   - Protección anti-spam incluida (honeypot + captcha)

2. **Astro en modo estático** - Compatible con GitHub Pages
   - Build exitoso generado en `/dist`
   - Rutas API eliminadas (innecesarias para sitio estático)

3. **GitHub Actions workflow** - Despliegue automático
   - Se ejecuta al hacer push a `main` o `master`
   - Configura automáticamente `SITE` y `BASE_PATH`

---

## 🚀 Pasos para Desplegar

### 1. Configurar GitHub Pages (una sola vez)

```bash
# En tu repositorio local (si aún no lo tienes):
git init
git add .
git commit -m "Configuración inicial para GitHub Pages con FormSubmit"
git branch -M main

# Crear repositorio en GitHub y conectarlo:
# Ve a https://github.com/new
# Nombre sugerido: "portafolio" o "miguelangellh.github.io" (para user page)

git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### 2. Activar GitHub Pages en tu repositorio

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (⚙️)
3. En el menú lateral, click en **Pages**
4. En **Build and deployment**, selecciona:
   - **Source**: GitHub Actions
5. ¡Listo! El workflow se ejecutará automáticamente

### 3. Verificar el despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verás el workflow "Deploy Astro to GitHub Pages" ejecutándose
3. Cuando termine (✅), tu sitio estará en:
   - User page: `https://TU_USUARIO.github.io`
   - Project page: `https://TU_USUARIO.github.io/TU_REPO`

---

## 📧 Activación de FormSubmit (IMPORTANTE)

**La primera vez que alguien envíe un formulario:**

1. FormSubmit enviará un email de confirmación a `miguelhdez0903@gmail.com`
2. **Debes hacer click en el enlace de confirmación**
3. Después de eso, todos los mensajes llegarán directamente

**Opcional - Personalizar emails:**
- Ve a https://formsubmit.co/
- Puedes configurar templates personalizados, autorespuestas, etc.

---

## 🧪 Probar Localmente

```bash
# Instalar dependencias
npm install

# Desarrollo (modo dev)
npm run dev
# → Abre http://localhost:4321

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

---

## 📝 Configuración del Formulario

Tu formulario ahora usa FormSubmit con:

- ✅ **Anti-spam**: Honeypot field oculto
- ✅ **CAPTCHA deshabilitado** (puedes activarlo cambiando `_captcha` a `true`)
- ✅ **Template limpio**: Formato de tabla en emails
- ✅ **Redirección**: Regresa a tu sitio después de enviar
- ✅ **Asunto personalizado**: "Nuevo mensaje desde tu portafolio"

**Campos que recibirás por email:**
- Nombre
- Email (del remitente)
- Asunto
- Mensaje

---

## 🔧 Personalización Adicional

### Cambiar el email de destino:

Edita [src/pages/index.astro](src/pages/index.astro) línea 9:
```astro
const contactEndpoint = 'https://formsubmit.co/TU_NUEVO_EMAIL@ejemplo.com';
```

### Activar CAPTCHA:

Edita [src/pages/index.astro](src/pages/index.astro) línea 144:
```html
<input type="hidden" name="_captcha" value="true" />
```

### Personalizar mensaje de éxito:

FormSubmit te redirige de vuelta al sitio. Puedes:
1. Crear una página `/gracias` personalizada
2. Cambiar el valor de `_next` en el formulario

---

## 🎯 Ventajas de esta configuración

✅ **100% Gratis** - Sin costos ni límites
✅ **Sin servidor** - GitHub Pages gratis
✅ **Sin configuración compleja** - Todo listo para usar
✅ **Emails directos** - No necesitas panel de control
✅ **Anti-spam** - Protección incluida
✅ **Rápido** - Despliegue automático en minutos

---

## 🐛 Solución de Problemas

### El formulario no envía:
1. Verifica que confirmaste el email en FormSubmit
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de llenar todos los campos obligatorios

### El sitio no se despliega:
1. Verifica que GitHub Pages está en "GitHub Actions" mode
2. Revisa la pestaña Actions para ver errores
3. Asegúrate de que el workflow tiene permisos (Settings → Actions → General → Workflow permissions)

### Las rutas no funcionan (404):
- Si es project page, tu base path es `/nombre-repo/`
- El workflow configura esto automáticamente

---

## 📞 ¿Necesitas ayuda?

Si tienes problemas con el despliegue o el formulario, avísame y te ayudo a resolverlo.

**¡Tu portafolio está listo para el mundo! 🚀**
