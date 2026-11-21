import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getInstitucionalData } from '@/lib/institucional'

export const metadata: Metadata = {
  title: 'Diário da Manacá',
  description: 'Histórias e inspirações para viajar com a Manacá.',
}

export default async function BlogPage() {
  const institucional = await getInstitucionalData()
  const payload = await getPayloadClient()

  let posts: any[] = []
  try {
    const result = await payload.find({
      collection: 'posts',
      where: {
        draft: {
          equals: false,
        },
      },
      sort: '-date',
    })
    posts = result.docs
  } catch (error) {
    console.warn('Erro ao carregar posts:', error)
  }

  return (
    <>
      <section className="page-hero lavender">
        <div className="wrap">
          <p className="eyebrow">DIÁRIO DA MANACÁ</p>
          <h1>
            Histórias para
            <br />
            <em>levar com você.</em>
          </h1>
          <p>{institucional.diarioTexto}</p>
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="section wrap">
          <div className="post-grid">
            {posts.map((post) => {
              const formattedDate = post.date
                ? new Date(post.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : null
              return (
                <article key={post.id || post.slug} className="post-card">
                  <Link href={`/blog/${post.slug}`} className="post-card-link">
                    <h2>{post.title}</h2>
                    {formattedDate && (
                      <div className="post-card-meta">
                        <time dateTime={post.date}>{formattedDate}</time>
                      </div>
                    )}
                    <p>{post.summary}</p>
                    <span className="post-card-cta">Ler história ↗</span>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      ) : (
        <section className="section wrap editorial">
          <div>
            <span className="eyebrow">EM BREVE</span>
            <h2>As primeiras histórias ainda estão a caminho.</h2>
          </div>
          <div>
            <p>
              Enquanto o diário ganha forma, conheça lugares que inspiram novas
              descobertas.
            </p>
            <Link className="text-link" href="/destinos">
              Explorar destinos ↗
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
