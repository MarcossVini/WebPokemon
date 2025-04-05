import { IncomingMessage, ServerResponse } from 'http';

declare module 'http' {
  interface IncomingMessage {
    body?: any;
  }
}

export async function json(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const buffers: Buffer[] = [];

  for await (const chunk of req) {
    buffers.push(Buffer.from(chunk));
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader('Content-Type', 'application/json');
}