import { withPayload } from '@payloadcms/next/withPayload'

const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticExport ? 'export' : undefined,
  basePath: process.env.NEXT_BASE_PATH || undefined,
  trailingSlash: isStaticExport ? true : undefined,
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
