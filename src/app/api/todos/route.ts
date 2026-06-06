import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env);
  const todos = await db.query.todos.findMany();
  return new Response(JSON.stringify(todos), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const db = getDb(env);
  const { title, description } =
    (await request.json()) as typeof todos.$inferSelect;
  const id = crypto.randomUUID();
  const newTodo = await db
    .insert(todos)
    .values({
      id,
      title,
      description,
      completed: 0,
      created_at: new Date(),
      updated_at: new Date(),
    })
    .returning();
  return new Response(JSON.stringify(newTodo), {
    headers: { "Content-Type": "application/json" },
  });
}
