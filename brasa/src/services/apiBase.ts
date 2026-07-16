export function resolveDefaultApiBase(hostname = window.location.hostname): string {
  if (hostname === 'brasa.leonardobrasil.com.br') {
    return 'https://leonardobrasil.com.br';
  }

  return '';
}

export function getApiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_BRASA_API_BASE_URL?.replace(/\/$/, '') || resolveDefaultApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
