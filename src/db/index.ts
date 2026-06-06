import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "@/db/schema";
import ws from "ws";

if (typeof window === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

export function getDb(env: any) {
  const callingQueue = async () => {
    try {
      if (env.EMAIL_QUEUE) {
        await env.EMAIL_QUEUE.send({
          message: "Hello from the database connection!",
          timestamp: new Date().toISOString(),
        });
        console.log(
          "👉 [QUEUE SUCCESS]: Message successfully sent to EMAIL_QUEUE",
        );
      } else {
        console.warn(
          "⚠️ [QUEUE WARN]: EMAIL_QUEUE binding is missing in this environment",
        );
      }
    } catch (error) {
      console.error(
        "❌ [QUEUE ERROR]: Failed to send message to queue:",
        error,
      );
    }
  };

  const connectionString =
    env.HYPERDRIVE?.connectionString ||
    env.DATABASE_URL ||
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("Database connection string is missing!");
  }

  const pool = new Pool({ connectionString });
  callingQueue();

  return drizzle(pool, { schema });
}
