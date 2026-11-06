// Google Apps Script web app that emails contact-form submissions.
//
// Lives on the client's Google account (script.google.com), not on Cloudflare.
// Only the /api/contact Pages Function calls it, authenticated by a shared
// secret stored in Project Settings → Script Properties as SHARED_SECRET.
//
// Deploy: Deploy → New deployment → Web app, Execute as: Me, Who has access:
// Anyone. When changing this file later, use Manage deployments → Edit → New
// version so the /exec URL stays the same.

const TO = "owner@their-domain.com"; // TODO: the inbox that receives messages
const MAX_PER_HOUR = 20;

function doPost(e) {
  const p = (e && e.parameter) || {};

  const secret = PropertiesService.getScriptProperties().getProperty("SHARED_SECRET");
  if (!secret || p.secret !== secret) return json({ ok: false, error: "forbidden" });

  const name = oneLine(p.name, 100);
  const email = oneLine(p.email, 254);
  const message = String(p.message || "").trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "invalid" });
  }

  // Cap total sends per clock hour so nothing can flood the inbox or burn the quota.
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    const key = "sent-" + Math.floor(Date.now() / 3600000);
    const count = Number(cache.get(key) || 0);
    if (count >= MAX_PER_HOUR) return json({ ok: false, error: "rate_limited" });
    cache.put(key, String(count + 1), 3600);
  } finally {
    lock.releaseLock();
  }

  MailApp.sendEmail({
    to: TO,
    replyTo: email,
    subject: "[Website] Message from " + name,
    body:
      "Sent from the Grand Slam Laundry website contact form.\n\n" +
      "Name: " + name + "\nEmail: " + email + "\n\n" + message,
  });

  return json({ ok: true });
}

function oneLine(value, max) {
  return String(value || "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
