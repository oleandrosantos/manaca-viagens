import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getInstitucionalData } from '@/lib/institucional'

export const metadata: Metadata = {
  title: 'A Manacá',
  description: 'Conheça a história e a maneira de pensar viagens da Manacá.',
}

export default async function QuemSomosPage() {
  const institucional = await getInstitucionalData()

  return (
    <>
      <section className="page-hero blush">
        <div className="wrap">
          <p className="eyebrow">A MANACÁ / NOSSA HISTÓRIA</p>
          <h1>
            Uma viagem pode
            <br />
            <em>abrir novos caminhos.</em>
          </h1>
          <p>
            Planejar é cuidar do caminho para que você possa estar presente em cada
            descoberta.
          </p>
        </div>
      </section>

      <section className="section wrap editorial">
        <div>
          <span className="eyebrow">NOSSO NOME</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-flower"
            src="/media/flor.png"
            alt="Flor de manacá-da-serra em tons de rosa e lilás"
            loading="lazy"
          />
          <h2>
            Como a flor,
            <br />
            <em>em transformação.</em>
          </h2>
        </div>
        <div>
          {institucional.nomeTexto.map((texto, index) => (
            <p key={index}>{texto}</p>
          ))}
        </div>
      </section>

      <section className="about-story">
        <div className="section wrap editorial">
          <div>
            <span className="eyebrow">QUEM SOMOS</span>
            <h2>
              A história da <em>Manacá.</em>
            </h2>
          </div>
          <div>
            {institucional.historiaTexto.map((texto, index) => (
              <p key={index}>{texto}</p>
            ))}
          </div>
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
          <span className="eyebrow">CONHEÇA A FUNDADORA</span>
          <h2>
            O cuidado de
            <br />
            <em>Adjane Costa.</em>
          </h2>
          {institucional.adjaneTexto.map((texto, index) => (
            <p key={index}>{texto}</p>
          ))}
          <Link className="text-link" href="/servicos">
            Conheça a consultoria ↗
          </Link>
        </div>
      </section>

      <section className="closing-section wrap">
        <div className="closing">
          <span className="eyebrow eyebrow-on-dark">VAMOS MAIS LONGE</span>
          <h2>
            Seu jeito de viajar
            <br />
            <em>é o ponto de partida.</em>
          </h2>
          <Link className="button button-light" href="/contato">
            Contato <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
