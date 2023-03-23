import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  secret: process.env.APP_SECRET,
  port: parseInt(process.env.APP_SERVER_PORT, 10) || 3000,
}));
