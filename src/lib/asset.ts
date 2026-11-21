export function getAssetPath(path: string | null | undefined): string {
  if (!path) return ''
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Evita duplicar o basePath se o caminho já contiver
  if (basePath && cleanPath.startsWith(basePath)) {
    return cleanPath
  }

  return `${basePath}${cleanPath}`
}
