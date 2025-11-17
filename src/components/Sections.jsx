import { Link } from 'react-router-dom'

export function WhatWeDo() {
  const items = [
    {
      title: 'Agenzia per fornitori',
      desc: 'Rappresentiamo brand selezionati e costruiamo canali affidabili in Italia.',
      link: '/services/agency'
    },
    {
      title: 'Rivendita componenti',
      desc: 'Selezione, quotazione e gestione ordini con un unico interlocutore.',
      link: '/services/resale'
    },
    {
      title: 'Logistica & tempi',
      desc: 'Organizziamo spedizioni e consegne con tempi certi e tracciabilità.',
      link: '/services/logistics'
    },
    {
      title: 'Componenti difficili',
      desc: 'Cerchiamo alternative, lotti speciali e componenti obsoleti.',
      link: '/services/special-quotes'
    }
  ]
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Cosa facciamo</h2>
        <p className="mt-2 text-slate-600">Dal preventivo alla consegna, gestiamo noi la complessità.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.title} className="rounded-xl border border-slate-200 p-5 shadow-sm bg-white">
              <h3 className="font-semibold text-slate-900">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
              <Link to={it.link} className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium">Approfondisci →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyUs() {
  const perks = [
    'Comparazione multi-fornitore',
    'Unico punto di contatto',
    'Velocità e trasparenza',
    'Flessibilità su quantità e alternative',
  ]
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Perché CEAP</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {perks.map((p) => (
            <div key={p} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">{p}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessMini() {
  const steps = [
    'Raccolta specifiche',
    'Ricerca fornitori',
    'Comparazione condizioni',
    'Offerta strutturata',
    'Ordine e consegna',
  ]
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Come lavoriamo</h2>
        <ol className="mt-8 grid md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg border bg-slate-50 p-4 text-center">
              <div className="text-sm text-slate-500">Step {i + 1}</div>
              <div className="font-semibold text-slate-800">{s}</div>
            </li>
          ))}
        </ol>
        <Link to="/how-we-work" className="mt-6 inline-block text-blue-600 font-medium">Vedi il processo completo →</Link>
      </div>
    </section>
  )
}

export function BrandsAndTypes() {
  const brands = ['Texas Instruments','Microchip','STMicro','ON Semi','Vishay','Infineon']
  const types = ['Diodi','MOSFET','IC','Microcontrollori','Fusibili','Connettori','Passivi']
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Marchi e componenti</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {brands.map(b => <span key={b} className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700">{b}</span>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {types.map(t => <span key={t} className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm">{t}</span>)}
        </div>
      </div>
    </section>
  )
}

export function Ceap20Teaser() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">CEAP 2.0 – Gestionale & Automazioni</h2>
        <p className="mt-2 text-slate-600">Comparazioni automatiche, storico prezzi e offerte più rapide: più valore, meno attese.</p>
        <Link to="/ceap20" className="mt-4 inline-block text-blue-600 font-medium">Scopri come organizziamo le tue offerte →</Link>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-slate-900">Affidabilità</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm h-28 grid place-items-center text-slate-500">Spazio per testimonianze</div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow">
          <h3 className="text-2xl font-bold text-slate-900">Inviaci i tuoi codici</h3>
          <p className="mt-2 text-slate-600">Risposta tipica in 24–48h lavorative. Accettiamo Excel/PDF con liste componenti.</p>
          <a href="/contact" className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-5 py-3 text-white font-medium hover:bg-blue-700">Invia richiesta</a>
        </div>
      </div>
    </section>
  )
}
