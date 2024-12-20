import { Client } from "@editframe/api";

if (!process.env.EF_TOKEN) {
  throw new Error("Missing EF_TOKEN environment variable");
}

export const editframeClient = new Client(
  process.env.EF_TOKEN,
  process.env.EF_HOST
); 