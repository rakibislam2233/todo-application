import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
export function getDb(env: any) {
  const connectionString =
    env.HYPERDRIVE?.connectionString || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Database connection string is missing!");
  }
  const client = new Client({
    connectionString: connectionString,
  });
  client.connect().catch((err: any) => {
    console.error("Failed to connect to the database:", err);
    throw err;
  });

  return drizzle(client, { schema });
}
