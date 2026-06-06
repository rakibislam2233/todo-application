import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema";

let client: ReturnType<typeof postgres> | null = null;

function getClient(env: any) {
  if (!client) {
    const connectionString =
      env.HYPERDRIVE?.connectionString ||
      env.DATABASE_URL ||
      process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("Database connection string is missing!");
    }

    client = postgres(connectionString, {
      fetch_types: false,
      prepare: false,
      max: 1,
    });
  }
  return client;
}

export function getDb(env: any) {
  return drizzle(getClient(env), { schema });
}
