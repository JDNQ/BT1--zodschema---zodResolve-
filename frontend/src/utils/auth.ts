export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = window.localStorage.getItem("accessToken");
  return Boolean(token);
}
