// Cloudflare Pages Function: POST /api/contact
//
// The browser never talks to Apps Script directly. This function verifies the
// Turnstile token (proving a real visitor on this site), then forwards the
// message to the Apps Script web app along with a shared secret that only this
// function and the script know.
//
// Set these in Cloudflare Pages → Settings → Variables and Secrets
// (or in .dev.vars for `wrangler pages dev`):
//   APPS_SCRIPT_URL       the Apps Script web app's /exec URL
//   APPS_SCRIPT_SECRET    long random string, also saved as SHARED_SECRET in
//                         the script's Script Properties
//   TURNSTILE_SECRET_KEY  from the Cloudflare Turnstile widget

interface Env {
  APPS_SCRIPT_URL: string;
  APPS_SCRIPT_SECRET: string;
  TURNSTILE_SECRET_KEY: string;
}

interface TurnstileResult {
  success: boolean;
  hostname?: string;
}

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const missing = (["APPS_SCRIPT_URL", "APPS_SCRIPT_SECRET", "TURNSTILE_SECRET_KEY"] as const)
    .filter((key) => !env[key]);
  if (missing.length) {
    console.error("contact: missing env vars", missing);
    return reply(500, "misconfigured");
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, "bad_request");
  }

  // Bots fill the hidden field; pretend success so they don't retry.
  if (form.get("_gotcha")) return reply(200);

  const token = form.get("cf-turnstile-response");
  if (typeof token !== "string" || !token) return reply(403, "captcha");

  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    },
  );
  const captcha = (await verify.json().catch(() => null)) as TurnstileResult | null;

  // The token must have been issued on the same host that's calling us, so a
  // widget embedded on some other site can't be used to mint valid tokens.
  if (!captcha?.success || captcha.hostname !== new URL(request.url).hostname) {
    return reply(403, "captcha");
  }

  let res: Response;
  let body: string;
  try {
    res = await fetch(env.APPS_SCRIPT_URL, {
      method: "POST",
      body: new URLSearchParams({
        secret: env.APPS_SCRIPT_SECRET,
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
      }),
    });
    body = await res.text();
  } catch (err) {
    console.error("contact: Apps Script request failed", err);
    return reply(500, "send_failed");
  }

  let result: { ok: boolean; error?: string } | null = null;
  try {
    result = JSON.parse(body);
  } catch {}

  // 500 rather than 502: Cloudflare swaps 502 responses for its own error
  // page, which hides the error code from the browser.
  if (!result?.ok) {
    console.error("contact: Apps Script rejected", res.status, body.slice(0, 500));
    return reply(500, result?.error ?? "send_failed");
  }
  return reply(200);
}

function reply(status: number, error?: string): Response {
  return Response.json(error ? { ok: false, error } : { ok: true }, { status });
}
