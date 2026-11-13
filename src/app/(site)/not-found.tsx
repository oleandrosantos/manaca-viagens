import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="page-hero lavender">
      <div className="wrap">
        <p className="eyebrow">404 / CAMINHO NÃO ENCONTRADO</p>
        <h1>
          Vamos encontrar
          <br />
          <em>outro caminho?</em>
        </h1>
        <p>Esta página não está disponível.</p>
        <Link className="button button-dark" href="/">
          Voltar ao início <span>↗</span>
        </Link>
      </div>
    </section>
  )
}
