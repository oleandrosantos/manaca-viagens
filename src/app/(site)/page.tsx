import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { getInstitucionalData } from '@/lib/institucional'
import HeroVideo from '@/components/HeroVideo'

export const metadata: Metadata = {
  title: 'Viagens no seu ritmo',
  description: 'Consultoria de viagens personalizadas, com cuidado em cada escolha.',
}

export default async function HomePage() {
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
      <section className="hero">
        <HeroVideo />
        <div className="hero-content wrap">
          <p className="eyebrow light">{institucional.heroEyebrow}</p>
          <h1>{institucional.heroTitle}</h1>
          <p>{institucional.heroDescription}</p>
          <Link className="button button-light" href="/servicos">
            Conheça a consultoria <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="intro wrap section">
        <div className="intro-heading">
          <p className="eyebrow">OLÁ, SOMOS A MANACÁ</p>
          <h2>{institucional.introTitle}</h2>
        </div>
        <div className="intro-copy">
          <p>{institucional.nomeTexto[0]}</p>
          <Link className="text-link" href="/quem-somos">
            Conheça nossa história <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="approach">
        <div className="wrap">
          <div className="approach-grid">
            <div>
              <span className="eyebrow">CONSULTORIA DE VIAGENS PERSONALIZADAS</span>
              <h2>
                Uma viagem pensada para <em>você.</em>
              </h2>
            </div>
            <div>
              <p>{institucional.introText}</p>
              <Link className="text-link" href="/servicos">
                Conheça a consultoria <span>↗</span>
              </Link>
            </div>
          </div>
          {institucional.beneficios.length > 0 && (
            <div className="approach-cards">
              {institucional.beneficios.map((item, index) => (
                <article key={index} className="approach-card">
                  <span className="approach-card-num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section wrap destinations">
        <div className="section-head">
          <div>
            <span className="eyebrow">INSPIRAÇÃO PARA IR ALÉM</span>
            <h2>
              Lugares que convidam
              <br />
              <em>a desacelerar.</em>
            </h2>
          </div>
          <Link className="text-link" href="/destinos">
            Ver destinos ↗
          </Link>
        </div>
        <p className="section-intro">{institucional.destinosTexto}</p>
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

      <section className="founder">
        <div className="founder-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/adjane.jpg"
            alt="Adjane Costa em meio à vegetação"
            loading="lazy"
          />
        </div>
        <div className="founder-copy">
          <span className="eyebrow">POR TRÁS DA MANACÁ</span>
          <h2>
            Viajar também é<br />
            <em>se transformar.</em>
          </h2>
          <p>{institucional.adjaneTexto[0]}</p>
          <p>{institucional.adjaneTexto[1]}</p>
          <Link className="text-link" href="/quem-somos">
            A história da Manacá ↗
          </Link>
        </div>
      </section>

      <section className="closing-section wrap">
        <div className="closing">
          <span className="eyebrow eyebrow-on-dark">DIÁRIO DA MANACÁ</span>
          <h2>
            Ideias para <em>viajar.</em>
          </h2>
          <p className="closing-intro">{institucional.diarioTexto}</p>
          <Link className="button button-light" href="/blog">
            Conheça o diário <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
