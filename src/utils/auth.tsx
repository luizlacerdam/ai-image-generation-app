export const getAuthToken = (): string | null => {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
