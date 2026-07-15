export function getApiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_BRASA_API_BASE_URL?.replace(/\/$/, '') || '';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
