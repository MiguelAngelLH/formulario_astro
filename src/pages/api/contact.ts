export const prerender = false;

type JsonResponse = {
  ok: boolean;
  message: string;
};

function json(body: JsonResponse, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readBody(request: Request): Promise<{
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const data = (await request.json()) as Record<string, unknown>;
    return {
      name: String(data.name ?? ''),
      email: String(data.email ?? ''),
      subject: String(data.subject ?? ''),
      message: String(data.message ?? ''),
      company: String(data.company ?? ''),
    };
  }

  const form = await request.formData();
  return {
    name: String(form.get('name') ?? ''),
    email: String(form.get('email') ?? ''),
    subject: String(form.get('subject') ?? ''),
    message: String(form.get('message') ?? ''),
    company: String(form.get('company') ?? ''),
  };
}

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    const { name, email, subject, message, company } = await readBody(request);

    // Honeypot anti-spam: bots usually fill hidden fields
    if (company && company.trim().length > 0) {
      return json({ ok: true, message: 'Enviado.' }, 200);
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return json(
        { ok: false, message: 'Completa nombre, correo y mensaje.' },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return json({ ok: false, message: 'Correo inválido.' }, 400);
    }

    const apiKey = (process.env.MAILERSEND_API_KEY ?? (import.meta.env.MAILERSEND_API_KEY as string | undefined))?.trim();
    const fromEmail = (process.env.MAILERSEND_FROM_EMAIL ?? (import.meta.env.MAILERSEND_FROM_EMAIL as string | undefined))?.trim();
    const fromName =
      (process.env.MAILERSEND_FROM_NAME ?? (import.meta.env.MAILERSEND_FROM_NAME as string | undefined))?.trim() ||
      'Portafolio';
    const toEmail = (process.env.MAILERSEND_TO_EMAIL ?? (import.meta.env.MAILERSEND_TO_EMAIL as string | undefined))?.trim();

    const missing: string[] = [];
    if (!apiKey) missing.push('MAILERSEND_API_KEY');
    if (!fromEmail) missing.push('MAILERSEND_FROM_EMAIL');
    if (!toEmail) missing.push('MAILERSEND_TO_EMAIL');
    if (missing.length) {
      return json(
        {
          ok: false,
          message: `Faltan variables de entorno: ${missing.join(', ')}.`,
        },
        500,
      );
    }

    const cleanSubject = subject?.trim() ? subject.trim() : 'Nuevo mensaje desde el portafolio';

    const html = `
      <h2>Nuevo mensaje desde el portafolio</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(cleanSubject)}</p>
      <p><strong>Mensaje:</strong></p>
      <pre style="white-space:pre-wrap; font-family:inherit;">${escapeHtml(message)}</pre>
    `.trim();

    const text = [
      'Nuevo mensaje desde el portafolio',
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Asunto: ${cleanSubject}`,
      '',
      message,
    ].join('\n');

    const payload = {
      from: { email: fromEmail, name: fromName },
      to: [{ email: toEmail }],
      subject: `[Portafolio] ${cleanSubject}`,
      text,
      html,
      reply_to: { email, name },
    };

    const res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.error('[MailerSend] Error response', {
        status: res.status,
        body: errText?.slice(0, 2000),
      });

      if (res.status === 401 || res.status === 403) {
        return json(
          {
            ok: false,
            message:
              'No se pudo autenticar con el servicio de correo (revisa MAILERSEND_API_KEY).',
          },
          502,
        );
      }

      if (res.status === 422) {
        return json(
          {
            ok: false,
            message:
              'El servicio de correo rechazó el envío. Revisa que el remitente (MAILERSEND_FROM_EMAIL) esté verificado en MailerSend.',
          },
          502,
        );
      }

      return json(
        {
          ok: false,
          message:
            'No se pudo enviar el mensaje en este momento. Intenta más tarde.',
        },
        502,
      );
    }

    return json({ ok: true, message: '¡Listo! Tu mensaje fue enviado.' }, 200);
  } catch (e) {
    console.error('[Contact API] Unhandled error', e);
    return json(
      { ok: false, message: 'Ocurrió un error inesperado. Intenta más tarde.' },
      500,
    );
  }
}

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
