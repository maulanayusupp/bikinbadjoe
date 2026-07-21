/**
 * Contact form endpoint.
 *
 * Validates the payload, rejects bots via a honeypot field, and hands the
 * message off for delivery. Delivery is intentionally a single extension point
 * (`deliverMessage`) so wiring a real inbox later — email (SMTP/Resend),
 * Telegram, or a CRM webhook — is a one-place change. See TODO.md.
 */
interface ContactPayload {
  name?: string
  contact?: string
  subject?: string
  message?: string
  website?: string // honeypot — must stay empty
}

function isBlank(v: unknown): boolean {
  return typeof v !== 'string' || v.trim().length === 0
}

async function deliverMessage(msg: Required<Omit<ContactPayload, 'website'>>) {
  // TODO(commerce): wire to a real inbox (email/Telegram/CRM webhook).
  // For now we log server-side so submissions are observable in deployment logs.
  console.info('[contact] new message', {
    name: msg.name,
    contact: msg.contact,
    subject: msg.subject,
    length: msg.message.length,
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)

  // Honeypot: real users never fill this hidden field.
  if (body?.website && body.website.trim().length > 0) {
    return { ok: true } // silently accept to not tip off bots
  }

  if (isBlank(body?.name) || isBlank(body?.contact) || isBlank(body?.message)) {
    throw createError({ statusCode: 422, statusMessage: 'Missing required fields' })
  }

  if ((body!.message as string).length > 5000) {
    throw createError({ statusCode: 413, statusMessage: 'Message too long' })
  }

  await deliverMessage({
    name: body!.name!.trim(),
    contact: body!.contact!.trim(),
    subject: (body!.subject || '-').trim(),
    message: body!.message!.trim(),
  })

  return { ok: true }
})
