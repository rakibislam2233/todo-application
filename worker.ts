// @ts-ignore
import worker from "./.open-next/worker";
export default {
  fetch: worker.fetch,

  async queue(batch: MessageBatch<{ content: string }>, env: CloudflareEnv) {
    for (const message of batch.messages) {
      const { content } = message.body;
      console.log("Received message from queue:", content);
    }
  },
};
