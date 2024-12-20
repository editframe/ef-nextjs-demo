"use server";

import { createURLToken } from "@editframe/api";

import { editframeClient } from "@/app/lib/editframeClient";

export async function POST(request: Request) {
  const { url } = await request.json();
  const token = await createURLToken(editframeClient, url);
  return new Response(JSON.stringify({ token }), {
    headers: { "content-type": "application/json" },
  });
}