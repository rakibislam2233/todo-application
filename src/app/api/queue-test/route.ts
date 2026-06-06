import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET() {
  const { env } = await getCloudflareContext({ async: true });

  try {
    if (!env.EMAIL_QUEUE) {
      return Response.json(
        { error: "Queue binding missing!" },
        { status: 500 },
      );
    }

    await env.EMAIL_QUEUE.send({
      type: "test_email",
      payload: {
        message: "Direct test from API Route!",
        timestamp: new Date().toISOString(),
      },
    });

    return Response.json({ success: true, message: "Queue fired!" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
