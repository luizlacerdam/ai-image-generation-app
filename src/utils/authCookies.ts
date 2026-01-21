const COOKIE_NAME = "token";

export function setTokenCookie(token: string, days = 7) {
  const maxAge = days * 24 * 60 * 60; // seconds
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    token,
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export function getTokenCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function clearTokenCookie() {
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}
