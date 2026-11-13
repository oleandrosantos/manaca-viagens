import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import ContentRenderer from '@/components/ContentRenderer'

interface DestinoPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'destinos',
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
}: DestinoPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'destinos',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const destino = result.docs[0]
  if (!destino) {
    return {
      title: 'Destino não encontrado',
    }
  }

  return {
    title: destino.title,
    description: destino.summary,
  }
}

export default async function DestinoDetailPage({ params }: DestinoPageProps) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'destinos',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const destino = result.docs[0]
  if (!destino) {
    notFound()
  }

  return (
    <>
      <section className="detail-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="destination-photo"
          src={destino.image}
          alt={destino.title}
        />
        <div className="wrap detail-content">
          <Link href="/destinos">← Todos os destinos</Link>
          <p className="eyebrow light">{destino.region}</p>
          <h1>{destino.title}</h1>
          <p>{destino.summary}</p>
        </div>
      </section>

      <section className="section wrap editorial">
        <div>
          <span className="eyebrow">UM LUGAR PARA SENTIR</span>
          <h2>O caminho também faz parte da viagem.</h2>
        </div>
        <div>
          <ContentRenderer content={destino.content} />
          <Link className="text-link" href="/servicos">
            Como funciona a consultoria ↗
          </Link>
        </div>
      </section>
    </>
  )
}
