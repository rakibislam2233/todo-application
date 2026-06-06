import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: Request) {
  const { env } = getCloudflareContext();

  try {
    if (!env.EMAIL_QUEUE) {
      return new Response(JSON.stringify({ error: "Queue binding missing!" }), {
        status: 500,
      });
    }
    await env.EMAIL_QUEUE.send(
      {
        message: "Direct test from API Route!",
        timestamp: new Date().toISOString(),
      },
      {
        delaySeconds: 3600, // 1 hour delay
      },
    );

    return new Response(
      JSON.stringify({ success: true, message: "Queue fired successfully!" }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
