import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAG } from "@/lib/content";

/**
 * Publish webhook — the Panel POSTs here after every save.
 * POST only, constant-time secret compare, no body echo.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!secret || !safeEqual(given, secret)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG, "max");
  return Response.json({ revalidated: true, at: Date.now() });
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}
