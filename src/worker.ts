import nextHandler from '../.open-next/worker.js';

export default {
  async fetch(request: Request, env: any, ctx: any) {
    return nextHandler.fetch(request, env, ctx);
  },
  async queue(batch: MessageBatch<any>, env: any, ctx: any): Promise<void> {
    for (const message of batch.messages) {
      console.log(`Processing message: ${message.id}`);
      console.log(`Payload:`, message.body);
    
      message.ack();
    }
  }
};