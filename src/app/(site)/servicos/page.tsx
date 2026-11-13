import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getInstitucionalData } from '@/lib/institucional'

export const metadata: Metadata = {
  title: 'Consultoria',
  description:
    'Entenda como a consultoria de viagens personalizadas da Manacá pode ajudar no seu planejamento.',
}

export default async function ServicosPage() {
  const institucional = await getInstitucionalData()

  return (
    <>
      <section className="page-hero lavender">
        <div className="wrap">
          <p className="eyebrow">CONSULTORIA / VIAGENS SOB MEDIDA</p>
          <h1>
            Planejar com cuidado.
            <br />
            <em>Viajar com leveza.</em>
          </h1>
          <p>Uma jornada pensada a partir de quem você é e do que deseja viver.</p>
        </div>
      </section>

      <section className="section wrap editorial">
        <div>
          <span className="eyebrow">O QUE FAZEMOS</span>
          <h2>
            O seu tempo
            <br />
            <em>vale a viagem.</em>
          </h2>
        </div>
        <div>
          <p>{institucional.introText}</p>
        </div>
      </section>

      <section className="benefits section">
        <div className="wrap">
          <span className="eyebrow">CONSULTORIA DE VIAGENS SOB MEDIDA</span>
          <h2>
            Cuidado em cada <em>escolha.</em>
          </h2>
          <div className="benefits-grid">
            {institucional.beneficios.map((beneficio, index) => (
              <article key={index}>
                <h3>{beneficio.title}</h3>
                <p>{beneficio.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process">
        <div className="wrap">
          <span className="eyebrow">JORNADA DE VIAGEM PERSONALIZADA</span>
          <h2>
            Uma jornada, <em>cinco etapas.</em>
          </h2>
          <ol className="steps">
            {institucional.jornada.map((step, index) => (
              <li key={index}>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section wrap editorial">
        <div>
          <span className="eyebrow">CONSULTORIA PERSONALIZADA</span>
          <h2>
            O que está <em>incluído?</em>
          </h2>
        </div>
        <div>
          <ul className="check-list">
            {institucional.incluido.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="audience-section">
        <div className="section wrap editorial">
          <div>
            <span className="eyebrow">SEU JEITO DE VIAJAR</span>
            <h2>
              Para quem é nossa <em>consultoria?</em>
            </h2>
          </div>
          <div>
            <p>A consultoria da Manacá é para quem:</p>
            <ul className="check-list">
              {institucional.publico.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="closing-section wrap">
        <div className="closing">
          <span className="eyebrow eyebrow-on-dark">COMECE A IMAGINAR</span>
          <h2>
            Qual será a sua
            <br />
            <em>próxima descoberta?</em>
          </h2>
          <Link className="button button-light" href="/contato">
            Entre em contato <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
