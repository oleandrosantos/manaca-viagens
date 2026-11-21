import { withPayload } from '@payloadcms/next/withPayload'

const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true'
const basePath = process.env.NEXT_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: basePath || undefined,
  trailingSlash: isStaticExport ? true : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)
