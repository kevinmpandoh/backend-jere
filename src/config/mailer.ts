import { env } from "./env";
import nodemailer from "nodemailer";

import { Resend } from "resend";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST!,
  port: env.SMTP_PORT!,
  secure: env.SMTP_SECURE! === "true",
  auth: {
    user: env.SMTP_USER!,
    pass: env.SMTP_PASSWORD!,
  },
});

const resend = new Resend("re_W2dnVwd4_5wyNBQyeHYQG5z3eHWfTMRVJ");

export async function sendMail(to: string, subject: string, html: string) {
  const info = await resend.emails.send({
    from: "noreply@wuwuk.my.id",
    to,
    subject,
    html,
  });
  if (env.NODE_ENV !== "production") console.log("Email sent:", info);
}
