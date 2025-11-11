import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not set - Database operations will fail');
  console.warn('   For local dev: Use a free PostgreSQL from https://neon.tech');
  console.warn('   Or run: docker run -p 5432:5432 -e POSTGRES_PASSWORD=password postgres');
  
  // Create a dummy connection for development (will fail if actually used)
  if (process.env.NODE_ENV === 'development') {
    console.warn('   Continuing in development mode WITHOUT database...');
  } else {
    throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
  }
}

export const pool = process.env.DATABASE_URL 
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null as any;
  
export const db = pool ? drizzle({ client: pool, schema }) : null as any;