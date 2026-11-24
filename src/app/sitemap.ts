import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { canonicalUrl } from '@/lib/seo'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: canonicalUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: canonicalUrl('/quem-somos'), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonicalUrl('/servicos'), changeFrequency: 'monthly', priority: 0.9 },
    { url: canonicalUrl('/destinos'), changeFrequency: 'weekly', priority: 0.9 },
    { url: canonicalUrl('/blog'), changeFrequency: 'weekly', priority: 0.8 },
    { url: canonicalUrl('/contato'), changeFrequency: 'monthly', priority: 0.8 },
  ]

  try {
    const payload = await getPayloadClient()

    const [destinosResult, postsResult] = await Promise.all([
      payload.find({
        collection: 'destinos',
        where: { draft: { equals: false } },
        limit: 200,
      }),
      payload.find({
        collection: 'posts',
        where: { draft: { equals: false } },
        sort: '-date',
        limit: 500,
      }),
    ])

    const destinoRoutes: MetadataRoute.Sitemap = destinosResult.docs
      .filter((doc) => Boolean(doc.slug))
      .map((doc) => ({
        url: canonicalUrl(`/destinos/${doc.slug}`),
        lastModified: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
        changeFrequency: 'monthly',
        priority: 0.8,
      }))

    const postRoutes: MetadataRoute.Sitemap = postsResult.docs
      .filter((doc) => Boolean(doc.slug))
      .map((doc) => ({
        url: canonicalUrl(`/blog/${doc.slug}`),
        lastModified: doc.updatedAt
          ? new Date(doc.updatedAt)
          : doc.date
            ? new Date(doc.date)
            : undefined,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))

    return [...staticRoutes, ...destinoRoutes, ...postRoutes]
  } catch (error) {
    console.warn('Erro ao gerar rotas dinâmicas do sitemap:', error)
    return staticRoutes
  }
}
