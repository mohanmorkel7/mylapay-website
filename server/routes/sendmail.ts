import { RequestHandler } from "express";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { z } from "zod";

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
  // Credentials are read automatically from env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
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

export const handleScheduleDemo: RequestHandler = async (req, res) => {
  try {
    const data = scheduleSchema.parse(req.body);

    const subject = `Schedule a Demo: ${data.demoTitle} — ${data.name} (${data.company})`;
    const html = `
      <h2>Schedule a Demo Request</h2>
      <ul>
        <li><strong>Title:</strong> ${data.demoTitle}</li>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Company:</strong> ${data.company}</li>
        <li><strong>Date:</strong> ${data.date}</li>
        <li><strong>Time:</strong> ${data.time}</li>
      </ul>
    `;
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
    const html = `
      <h2>Contact Us Submission</h2>
      <ul>
        <li><strong>First Name:</strong> ${data.first_name}</li>
        <li><strong>Last Name:</strong> ${data.last_name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone_no}</li>
        <li><strong>Message:</strong><br/>${escapeHtml(data.message)}</li>
      </ul>
    `;
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

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
