import { RequestHandler } from "express";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";

const BRAND_PRIMARY = "#2baee3";
const BRAND_DARK = "#1f2b5c";
const TEXT_MUTED = "#6b7280";

const scheduleSchema = z.object({
  demoTitle: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(4),
  company: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
});

const contactSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone_no: z.string().min(4),
  message: z.string().min(1),
});

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable ${name}`);
  return v;
}

function createSesClient(): SESClient {
  const region = getEnv("AWS_REGION");
  return new SESClient({ region });
}

async function sendEmail(params: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<string | undefined> {
  const Source = getEnv("SES_SOURCE_EMAIL");
  const DestinationEmail = getEnv("SES_DESTINATION_EMAIL");
  const ses = createSesClient();

  const command = new SendEmailCommand({
    Source,
    Destination: { ToAddresses: [DestinationEmail] },
    ReplyToAddresses: params.replyTo ? [params.replyTo] : undefined,
    Message: {
      Subject: { Data: params.subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: params.html, Charset: "UTF-8" },
        Text: { Data: params.text, Charset: "UTF-8" },
      },
    },
  });

  const res = await ses.send(command);
  return res.MessageId;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;color:${TEXT_MUTED};font-size:12px;letter-spacing:.02em;text-transform:uppercase">${escapeHtml(
        label,
      )}</td>
    </tr>
    <tr>
      <td style="padding:0 0 16px 0;font-size:16px;color:#111827;font-weight:600">${escapeHtml(
        value,
      )}</td>
    </tr>
  `;
}

function renderEmail(opts: {
  title: string;
  intro: string;
  fieldsHtml: string;
  footerNote?: string;
}): string {
  const preheader = opts.intro.replace(/<[^>]+>/g, "").slice(0, 140);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(opts.title)}</title>
  <style>
    @media (prefers-color-scheme: dark) {
      .card { background:#0b1220 !important; }
      .title { color:#E5E7EB !important; }
      .muted { color:#9CA3AF !important; }
      .value { color:#F9FAFB !important; }
    }
  </style>
</head>
<body style="margin:0;background:#f5f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(
    preheader,
  )}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f7fb;padding:24px 0">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="640" class="card" style="background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(31,43,92,0.08);overflow:hidden">
          <tr>
            <td style="background:${BRAND_DARK};padding:20px 24px">
              <table width="100%" role="presentation">
                <tr>
                  <td style="color:#ffffff;font-weight:800;font-size:20px;letter-spacing:.3px">Mylapay</td>
                  <td align="right">
                    <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:${BRAND_PRIMARY};color:#fff;font-size:12px;font-weight:700;">Notification</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 10px 28px">
              <h1 class="title" style="margin:0 0 6px 0;font-size:24px;line-height:1.3;color:#111827">${escapeHtml(
                opts.title,
              )}</h1>
              <p class="muted" style="margin:0;color:${TEXT_MUTED};font-size:14px;line-height:1.6">${opts.intro}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px 28px">
              <hr style="border:none;height:1px;background:linear-gradient(90deg, ${BRAND_DARK}, ${BRAND_PRIMARY});opacity:.15" />
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px 28px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${opts.fieldsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml(
                      getEnv("SES_DESTINATION_EMAIL"),
                    )}" style="display:inline-block;background:${BRAND_PRIMARY};color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:700;font-size:14px">Reply</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;padding:18px 24px;color:${TEXT_MUTED};font-size:12px;line-height:1.6">
              ${opts.footerNote ? escapeHtml(opts.footerNote) : "This email was sent automatically by the website forms."}
            </td>
          </tr>
        </table>
        <div style="color:${TEXT_MUTED};font-size:12px;margin-top:12px">&copy; ${new Date().getFullYear()} Mylapay. All rights reserved.</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const handleScheduleDemo: RequestHandler = async (req, res) => {
  try {
    const data = scheduleSchema.parse(req.body);

    const subject = `Schedule a Demo: ${data.demoTitle} — ${data.name} (${data.company})`;
    const fields = [
      fieldRow("Title", data.demoTitle),
      fieldRow("Name", data.name),
      fieldRow("Email", data.email),
      fieldRow("Phone", data.phone),
      fieldRow("Company", data.company),
      fieldRow("Date", data.date),
      fieldRow("Time", data.time),
    ].join("");

    const html = renderEmail({
      title: "Schedule a Demo Request",
      intro: `A new demo request was submitted.`,
      fieldsHtml: fields,
      footerNote: "Please respond to coordinate the demo schedule.",
    });

    const text = `Schedule a Demo Request\nTitle: ${data.demoTitle}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nCompany: ${data.company}\nDate: ${data.date}\nTime: ${data.time}`;

    const messageId = await sendEmail({
      subject,
      html,
      text,
      replyTo: data.email,
    });

    res.json({ ok: true, messageId });
  } catch (err: any) {
    const message = err?.message || "Failed to send email";
    res.status(500).json({ ok: false, error: message });
  }
};

export const handleContactUs: RequestHandler = async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);

    const subject = `Contact Us: ${data.first_name} ${data.last_name}`;
    const fields = [
      fieldRow("First Name", data.first_name),
      fieldRow("Last Name", data.last_name),
      fieldRow("Email", data.email),
      fieldRow("Phone", data.phone_no),
      fieldRow("Message", data.message),
    ].join("");

    const html = renderEmail({
      title: "Contact Us Submission",
      intro: `You received a new inquiry via the website contact form.`,
      fieldsHtml: fields,
      footerNote: "Reply directly to the sender to continue the conversation.",
    });

    const text = `Contact Us Submission\nFirst Name: ${data.first_name}\nLast Name: ${data.last_name}\nEmail: ${data.email}\nPhone: ${data.phone_no}\nMessage: ${data.message}`;

    const messageId = await sendEmail({
      subject,
      html,
      text,
      replyTo: data.email,
    });

    res.json({ ok: true, messageId });
  } catch (err: any) {
    const message = err?.message || "Failed to send email";
    res.status(500).json({ ok: false, error: message });
  }
};
