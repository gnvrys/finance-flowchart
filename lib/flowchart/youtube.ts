const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

function isValidId(id: string | null | undefined): id is string {
  return !!id && YOUTUBE_ID_RE.test(id);
}

/** Extracts an 11-char YouTube video ID from a shorts/watch/youtu.be/embed URL. Never throws; returns null for anything unrecognized. */
export function extractYouTubeVideoId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const host = parsed.hostname.replace(/^www\.|^m\./, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    return isValidId(id) ? id : null;
  }
  if (host === "youtube.com") {
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/")[2];
      return isValidId(id) ? id : null;
    }
    if (parsed.pathname === "/watch") {
      const id = parsed.searchParams.get("v");
      return isValidId(id) ? id : null;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      const id = parsed.pathname.split("/")[2];
      return isValidId(id) ? id : null;
    }
  }
  return null;
}
