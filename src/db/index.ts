import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

export function getDb(env: any) {
  const connectionString =
    env.HYPERDRIVE?.connectionString ||
    env.DATABASE_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Database connection string is missing!");
  }

  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}
