import { useEffect, useMemo, useState } from 'react'

export function PageWrapper({ title, children, intro }){
  useEffect(()=>{ document.title = `${title} – CEAP Componenti` }, [title])
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        {intro && <p className="mt-2 text-slate-600">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export function About(){
  return (
    <PageWrapper title="Chi siamo" intro="Il tuo partner per l’elettronica: agenzia commerciale e rivendita.">
      <div className="prose max-w-none">
        <p>Supportiamo le PMI italiane nella scelta e nell’acquisto di componenti. Siamo sia agenzia per i produttori che rivendita diretta: uniamo la flessibilità commerciale alla competenza tecnica.</p>
        <h3>Mission</h3>
        <p>Offrire offerte rapide e comparabili, riducendo complessità e tempi di approvvigionamento.</p>
        <h3>Vision</h3>
        <p>Diventare il riferimento per le PMI italiane nell’approvvigionamento elettronico.</p>
        <h3>Valori</h3>
        <ul>
          <li>Trasparenza</li>
          <li>Flessibilità</li>
          <li>Velocità</li>
          <li>Cura dei dettagli</li>
        </ul>
      </div>
    </PageWrapper>
  )
}

export function Services(){
  const items = [
    { title:'Agenzia & rappresentanza', to:'/services/agency', desc:'Accesso alla rete clienti e presenza locale.' },
    { title:'Rivendita componenti', to:'/services/resale', desc:'Unico interlocutore dal preventivo alla consegna.' },
    { title:'Gestione acquisti & logistica', to:'/services/logistics', desc:'Tempi certi, tracciabilità, pianificazione consegne.' },
    { title:'Special quote & componenti difficili', to:'/services/special-quotes', desc:'Scouting globale, alternative, lotti speciali.' },
  ]
  return (
    <PageWrapper title="Servizi" intro="Panoramica dei servizi principali. Clicca per il dettaglio.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(it => (
          <a key={it.to} href={it.to} className="rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-slate-900">{it.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
            <span className="mt-4 inline-block text-blue-600 text-sm">Dettagli →</span>
          </a>
        ))}
      </div>
    </PageWrapper>
  )
}

export function ServiceDetail({ kind }){
  const content = {
    agency: {
      title: 'Agenzia & rappresentanza',
      text: 'Per produttori e fornitori che vogliono una presenza efficace in Italia: accesso a rete clienti, supporto tecnico-commerciale, feedback di mercato.'
    },
    resale: {
      title: 'Rivendita componenti',
      text: 'Per PMI e laboratori: confronto multi-fornitore, alternative compatibili, gestione documentale e ordini.'
    },
    logistics: {
      title: 'Gestione acquisti & logistica',
      text: 'Pianificazione consegne, tracciabilità, accordi logistici e incoterms flessibili.'
    },
    'special-quotes': {
      title: 'Special quote & componenti difficili',
      text: 'Scouting globale di lotti speciali, verifica data code, qualità e tracciabilità.'
    }
  }
  const c = content[kind]
  return (
    <PageWrapper title={c.title} intro={c.text}>
      <a href="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-5 py-3 text-white font-medium">Richiedi informazioni su questo servizio</a>
    </PageWrapper>
  )
}

export function Components(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ type:'', mount:'', package:'', brand:'' })

  useEffect(() => { fetchData() }, [])

  async function fetchData(){
    setLoading(true)
    const qs = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([,v]) => v)))
    const res = await fetch(`${backend}/api/components?${qs.toString()}`)
    const data = await res.json()
    setItems(data.items || [])
    setLoading(false)
  }

  function Filter({ label, name, options }){
    return (
      <label className="text-sm text-slate-600">
        {label}
        <select value={filters[name]} onChange={e=>setFilters(v=>({...v,[name]:e.target.value}))} className="ml-2 rounded border px-2 py-1">
          <option value="">Tutte</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    )
  }

  return (
    <PageWrapper title="Componenti" intro="Catalogo orientativo: non è un e‑commerce. Usa i filtri per tipologia e invia una richiesta.">
      <div className="flex flex-wrap gap-4">
        <Filter label="Tipo" name="type" options={["Diodo","MOSFET","IC","Microcontrollore","Fusibile"]} />
        <Filter label="Montaggio" name="mount" options={["SMD","PTH"]} />
        <Filter label="Package" name="package" options={["SOT-23","SOIC","DPAK","DIP","QFN","1206"]} />
        <Filter label="Brand" name="brand" options={["ON Semi","Microchip","Texas Instruments","Vishay","Littelfuse"]} />
        <button onClick={fetchData} className="rounded bg-slate-900 px-3 py-2 text-white text-sm">Filtra</button>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="px-3 py-2">Codice</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2">Montaggio</th>
              <th className="px-3 py-2">Package</th>
              <th className="px-3 py-2">Note</th>
              <th className="px-3 py-2">Azione</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="px-3 py-4" colSpan={7}>Caricamento...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="px-3 py-4" colSpan={7}>Nessun componente trovato</td></tr>
            ) : (
              items.map((it, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-3 py-2 font-medium">{it.code}</td>
                  <td className="px-3 py-2">{it.brand}</td>
                  <td className="px-3 py-2">{it.type}</td>
                  <td className="px-3 py-2">{it.mount}</td>
                  <td className="px-3 py-2">{it.package}</td>
                  <td className="px-3 py-2">{it.notes}</td>
                  <td className="px-3 py-2"><a className="text-blue-600" href={`/contact?code=${encodeURIComponent(it.code)}`}>Richiedi quotazione</a></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  )
}

export function HowWeWork(){
  const steps = [
    {t:'Raccolta specifiche', d:'Lista codici o file Excel'},
    {t:'Ricerca fornitori', d:'Rete partner + scouting'},
    {t:'Comparazione', d:'Prezzi, tempi, brand, data code'},
    {t:'Offerta', d:'Documento chiaro con alternative'},
    {t:'Conferma & consegna', d:'Pianificazione logistica'},
  ]
  return (
    <PageWrapper title="Come lavoriamo" intro="Dal tuo file alla consegna: un processo semplice e trasparente.">
      <div className="grid md:grid-cols-5 gap-4">
        {steps.map((s, i) => (
          <div key={s.t} className="rounded-lg border bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Step {i + 1}</div>
            <div className="font-semibold text-slate-800">{s.t}</div>
            <p className="text-sm text-slate-600 mt-1">{s.d}</p>
          </div>
        ))}
      </div>
      <a href="/contact" className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-5 py-3 text-white font-medium">Inviaci subito i tuoi codici</a>
    </PageWrapper>
  )
}

export function Ceap20(){
  return (
    <PageWrapper title="CEAP 2.0 (Gestionale & Automazioni)" intro="Comparazioni automatiche, generazione offerte e storici – oggi strumento interno, domani web app.">
      <div className="prose max-w-none">
        <h3>Benefici per il cliente</h3>
        <ul>
          <li>Tempi di risposta più brevi</li>
          <li>Offerte più chiare e confrontabili</li>
          <li>Storico richieste ordinato</li>
        </ul>
        <h3>Roadmap</h3>
        <ul>
          <li>Area clienti con offerte e ordini</li>
          <li>Notifiche automatiche</li>
          <li>Download diretti dei documenti</li>
        </ul>
      </div>
    </PageWrapper>
  )
}

export function Resources(){
  const [faq, setFaq] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  useEffect(() => { (async()=>{ const r = await fetch(`${backend}/api/faq`); const d = await r.json(); setFaq(d.items||[]) })() }, [])
  return (
    <PageWrapper title="Risorse" intro="Blog/News (futuro) e FAQ utili.">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">FAQ</h3>
          <ul className="mt-4 space-y-3">
            {faq.map((f, i) => (
              <li key={i} className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="font-medium text-slate-900">{f.q}</div>
                <div className="text-slate-600 text-sm mt-1">{f.a}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="opacity-70">
          <div className="rounded-xl border border-dashed p-6">Area Blog/News in arrivo</div>
        </div>
      </div>
    </PageWrapper>
  )
}

export function Contact(){
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const params = new URLSearchParams(window.location.search)
  const preCode = params.get('code') || ''
  const [state, setState] = useState({ company:'', name:'', email:'', phone:'', topic:'Richiesta componente', message: preCode ? `Codice: ${preCode}` : '' })
  const [file, setFile] = useState(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function submit(e){
    e.preventDefault()
    setError('')
    const fd = new FormData()
    Object.entries(state).forEach(([k,v]) => fd.append(k, v))
    if(file) fd.append('file', file)
    const res = await fetch(`${backend}/api/leads`, { method:'POST', body: fd })
    if(res.ok){ setSent(true) } else { const data = await res.json(); setError(data.detail || 'Errore invio') }
  }

  if(sent){
    return (
      <PageWrapper title="Richiesta inviata">
        <div className="rounded-lg border bg-green-50 p-6 text-green-800">Grazie! Ti risponderemo entro 24–48h lavorative.</div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Contatti" intro="Preferisci parlare subito? Chiama +39 000 000 0000 o scrivici su WhatsApp.">
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Azienda*</label>
            <input required value={state.company} onChange={e=>setState(v=>({...v, company:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Nome e Cognome*</label>
            <input required value={state.name} onChange={e=>setState(v=>({...v, name:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email*</label>
            <input required type="email" value={state.email} onChange={e=>setState(v=>({...v, email:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Telefono</label>
            <input value={state.phone} onChange={e=>setState(v=>({...v, phone:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Come possiamo aiutarti?</label>
            <select value={state.topic} onChange={e=>setState(v=>({...v, topic:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2">
              <option>Richiesta componente</option>
              <option>Informazioni generali</option>
              <option>Diventa fornitore</option>
              <option>Altro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Messaggio / Codici*</label>
            <textarea required rows={6} value={state.message} onChange={e=>setState(v=>({...v, message:e.target.value}))} className="mt-1 w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Allega file (Excel/PDF)</label>
            <input type="file" onChange={e=>setFile(e.target.files[0])} className="mt-1 w-full" />
          </div>
          {error && <div className="rounded bg-red-50 p-3 text-red-700 text-sm">{error}</div>}
          <button className="rounded bg-blue-600 px-5 py-3 text-white font-medium">Invia richiesta</button>
        </div>
      </form>
    </PageWrapper>
  )
}
