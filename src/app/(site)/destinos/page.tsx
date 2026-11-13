import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getInstitucionalData } from '@/lib/institucional'

export const metadata: Metadata = {
  title: 'Destinos',
  description: 'Inspire-se com a Chapada Diamantina e a Serra da Mantiqueira.',
}

export default async function DestinosPage() {
  const institucional = await getInstitucionalData()
  const payload = await getPayloadClient()

  let destinos: any[] = []
  try {
    const result = await payload.find({
      collection: 'destinos',
      where: {
        draft: {
          equals: false,
        },
      },
    })
    destinos = result.docs
  } catch (error) {
    console.warn('Erro ao carregar destinos:', error)
  }

  return (
    <>
      <section className="page-hero blush">
        <div className="wrap">
          <p className="eyebrow">DESTINOS / INSPIRAÇÃO</p>
          <h1>
            Há lugares que
            <br />
            <em>ficam com a gente.</em>
          </h1>
          <p>{institucional.destinosTexto}</p>
        </div>
      </section>

      <section className="section wrap">
        <div className="destination-grid">
          {destinos.map((destino) => (
            <Link
              key={destino.id || destino.slug}
              className="destination-card"
              href={`/destinos/${destino.slug}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="destination-photo"
                src={destino.image}
                alt={destino.title}
                loading="lazy"
              />
              <span className="card-content">
                <small>{destino.region}</small>
                <strong>{destino.title}</strong>
                <span>Explorar destino ↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="closing wrap">
        <span className="eyebrow">O CAMINHO É SEU</span>
        <h2>
          Encontre o lugar
          <br />
          <em>que combina com você.</em>
        </h2>
        <Link className="button button-dark" href="/servicos">
          Conheça a consultoria <span>↗</span>
        </Link>
      </section>
    </>
  )
}
