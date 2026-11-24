export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://manacaviagens.com'
).replace(/\/+$/, '')

export const isIndexingAllowed =
  process.env.SITE_ALLOW_INDEX === 'true' ||
  (process.env.SITE_ALLOW_INDEX !== 'false' && !process.env.NEXT_BASE_PATH)

export function canonicalPath(pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`
  return clean === '/' || clean.endsWith('/') ? clean : `${clean}/`
}

export function canonicalUrl(pathname: string): string {
  return `${SITE_URL}${canonicalPath(pathname)}`
}
