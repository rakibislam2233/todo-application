import { getDb } from "@/db";
import { todos } from "@/db/schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env);

  const todo = await db.query.todos.findFirst({
    where: eq(todos.id, id),
  });

  return new Response(JSON.stringify(todo), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { env } = getCloudflareContext();
  const db = getDb(env);
  const { title, description, completed } =
    (await req.json()) as typeof todos.$inferSelect;
  console.log("Updating Todo:", { id, title, description, completed });

  const updatedTodo = await db
    .update(todos)
    .set({
      title,
      description,
      completed,
      updated_at: new Date(),
    })
    .where(eq(todos.id, id))
    .returning();

  return new Response(JSON.stringify(updatedTodo), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // toggle completed state
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env);

  const todo = await db.query.todos.findFirst({
    where: eq(todos.id, id),
  });

  if (!todo) {
    return new Response(JSON.stringify({ error: "Todo not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const nextCompletedState = todo.completed === 1 ? 0 : 1;

  const updatedTodo = await db
    .update(todos)
    .set({
      completed: nextCompletedState,
      updated_at: new Date(),
    })
    .where(eq(todos.id, id))
    .returning();

  return new Response(JSON.stringify(updatedTodo), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { env } = getCloudflareContext();
  const db = getDb(env);

  await db.delete(todos).where(eq(todos.id, id));

  return new Response(null, {
    status: 204,
  });
}
