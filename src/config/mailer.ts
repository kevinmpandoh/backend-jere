import nodemailer from "nodemailer";
import { env } from "./env";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE === "true",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  console.log(
    env.SMTP_HOST,
    env.SMTP_PORT,
    env.SMTP_SECURE === "true",
    env.SMTP_USER,
    env.SMTP_PASSWORD,
    "TESTING JO"
  );
  const info = await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });
  if (env.NODE_ENV !== "production") console.log("Email sent:", info.messageId);
}
