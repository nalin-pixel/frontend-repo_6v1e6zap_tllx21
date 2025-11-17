import { useEffect, useRef, useState } from 'react'

const initialMessages = [
  { role: 'assistant', content: "Ciao! Sono l'assistente CEAP. Posso aiutarti a inviare una richiesta componenti, rispondere a domande o indirizzarti alla pagina giusta." }
]

function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [leadDraft, setLeadDraft] = useState({ company: '', name: '', email: '', phone: '', items: [], message: '' })
  const [mode, setMode] = useState('idle') // idle | faq | lead
  const endRef = useRef(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendLead = async () => {
    try {
      const res = await fetch(`${backend}/api/chatbot/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadDraft, channel: 'chatbot' })
      })
      const data = await res.json()
      if(res.ok){
        setMessages(m => [...m, { role: 'assistant', content: 'Grazie! Abbiamo ricevuto la tua richiesta. Ti risponderemo entro 24–48h lavorative.' }])
        setMode('idle')
        setLeadDraft({ company: '', name: '', email: '', phone: '', items: [], message: '' })
      } else {
        throw new Error(data.detail || 'Errore invio')
      }
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', content: `C'è stato un errore nell'invio: ${e.message}` }])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if(!text) return

    setMessages(m => [...m, { role: 'user', content: text }])
    setInput('')

    // Routing semplice dell'intento
    if(/richiesta|quotazione|preventivo|componenti/i.test(text)){
      setMode('lead')
      setMessages(m => [...m, { role: 'assistant', content: 'Perfetto. Indica Azienda, Nome e Email. Puoi anche incollare i codici (uno per riga).' }])
      return
    }
    if(/come lavorate|processo|come funziona/i.test(text)){
      setMode('idle')
      setMessages(m => [...m, { role: 'assistant', content: `Riceviamo i tuoi codici, contattiamo i fornitori, compariamo prezzi/tempi e inviamo un'offerta chiara. Vuoi aprire la pagina del processo? https://${window.location.host}/how-we-work` }])
      return
    }
    if(/contatto|telefono|whatsapp|parlare/i.test(text)){
      setMode('idle')
      setMessages(m => [...m, { role: 'assistant', content: 'Puoi chiamarci al +39 000 000 0000 o scrivere su WhatsApp. Vuoi che ti inviamo un riepilogo via email?' }])
      return
    }

    // FAQ base
    const faqMap = {
      'tempi risposta': 'Generalmente 24–48h lavorative.',
      'tempi consegna': 'Tipicamente 2–3 settimane (variabile per brand e disponibilità).',
      'file': 'Sì, puoi allegare Excel/PDF dal form contatti o incollare i codici qui.',
      'obsoleti': 'Supportiamo ricerca alternative e lotti speciali.'
    }

    const lower = text.toLowerCase()
    const match = Object.entries(faqMap).find(([k]) => lower.includes(k))
    if(match){
      setMessages(m => [...m, { role: 'assistant', content: match[1] }])
    } else {
      setMessages(m => [...m, { role: 'assistant', content: 'Posso aiutarti con richieste componenti, FAQ o navigazione. Scrivi "richiesta" per iniziare una quotazione.' }])
    }
  }

  return (
    <>
      <button onClick={() => setOpen(v => !v)} className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700">
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-96 max-w-[calc(100vw-24px)] rounded-xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold text-slate-900">Assistente CEAP</div>
            <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">✕</button>
          </div>
          <div className="max-h-96 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'assistant' ? 'text-slate-700' : 'text-slate-900 font-medium'}>
                {m.content}
              </div>
            ))}
            {mode === 'lead' && (
              <div className="space-y-2 text-sm">
                <input className="w-full rounded border px-3 py-2" placeholder="Azienda" value={leadDraft.company} onChange={e=>setLeadDraft(v=>({...v, company:e.target.value}))} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="rounded border px-3 py-2" placeholder="Nome" value={leadDraft.name} onChange={e=>setLeadDraft(v=>({...v, name:e.target.value}))} />
                  <input className="rounded border px-3 py-2" placeholder="Email" value={leadDraft.email} onChange={e=>setLeadDraft(v=>({...v, email:e.target.value}))} />
                </div>
                <input className="w-full rounded border px-3 py-2" placeholder="Telefono (opzionale)" value={leadDraft.phone} onChange={e=>setLeadDraft(v=>({...v, phone:e.target.value}))} />
                <textarea className="w-full rounded border px-3 py-2" rows={3} placeholder="Lista codici, quantità, brand preferiti" value={leadDraft.message} onChange={e=>setLeadDraft(v=>({...v, message:e.target.value}))}></textarea>
                <button onClick={sendLead} className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">Invia richiesta</button>
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 rounded border px-3 py-2" placeholder="Scrivi un messaggio..." />
            <button className="rounded bg-blue-600 px-4 text-white">Invia</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
