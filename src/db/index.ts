import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";

export function getDb(env: any) {
  const connectionString =
    env.HYPERDRIVE?.connectionString || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Database connection string is missing!");
  }
  const pool = new Pool({ connectionString });
  return drizzle(pool, { schema });
}
