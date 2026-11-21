import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import ContentRenderer from '@/components/ContentRenderer'

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'posts',
      where: {
        draft: {
          equals: false,
        },
      },
      limit: 100,
    })

    return result.docs.map((doc) => ({
      slug: doc.slug,
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) {
    notFound()
  }

  const dateFormatted = post.date
    ? new Date(post.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <>
      <header className="page-hero lavender article-hero">
        <div className="wrap">
          <Link className="article-back" href="/blog">
            ← Voltar para o Diário da Manacá
          </Link>
          <h1>{post.title}</h1>
          {dateFormatted && (
            <div className="article-meta">
              <time className="eyebrow" dateTime={post.date}>
                {dateFormatted}
              </time>
            </div>
          )}
        </div>
      </header>

      <article className="section wrap article-content">
        <div className="article-body">
          <ContentRenderer content={post.content} />
        </div>
        <footer className="article-footer">
          <div>
            <span className="eyebrow">PLANEJE NO SEU RITMO</span>
            <h3>Quer transformar essa inspiração em viagem?</h3>
          </div>
          <div className="article-footer-actions">
            <Link className="button button-dark" href="/contato">
              Conversar com a Manacá <span>↗</span>
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}
