# portafolio_con_astro_formulario
Creación de un portafolio con Astro (template tipo Dimension) y formulario de contacto.

## Formulario de contacto (MailerSend)
El formulario de la sección **Contacto** envía correos vía un endpoint server-side:

- `POST /api/contact` → envía email usando la API de MailerSend

### Variables de entorno
Crea un archivo `.env` en la raíz (puedes copiar `.env.example`) y llena:

- `MAILERSEND_API_KEY`
- `MAILERSEND_FROM_EMAIL` (debe estar verificado en MailerSend)
- `MAILERSEND_FROM_NAME` (opcional)
- `MAILERSEND_TO_EMAIL` (a dónde llegan los mensajes)

### Ejecutar
- `npm install`
- `npm run dev`
