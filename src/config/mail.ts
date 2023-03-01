import { registerAs } from "@nestjs/config";

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  port: parseInt(process.env.MAIL_PORT, 10) || 2525,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  from: process.env.MAIL_FROM || 'noreply@example.com',
}));
