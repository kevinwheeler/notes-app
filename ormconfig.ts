import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const source = new DataSource({
  type: 'postgres' as const,
  url: process.env.DATABASE_URL,
  entities: ['src/server/app/**/*.entity.ts'],
  migrations: ['src/server/migration/*.{ts,js}'],
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? {
            rejectUnauthorized: true,
            ca: readFileSync('/app/db-certificate.pem').toString(),
          }
        : false,
    sslmode: 'require',
  },
});

export default source;
