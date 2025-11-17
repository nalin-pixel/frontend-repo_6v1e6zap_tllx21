function Footer(){
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-slate-600">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded bg-blue-600 text-white grid place-items-center font-bold">C</div>
              <span className="font-semibold text-slate-800">CEAP Componenti</span>
            </div>
            <p className="mt-3">P.IVA 00000000000 – Via Esempio 1, 20100 Milano</p>
            <p>Email: info@ceapcomponenti.it – Tel: +39 000 000 0000</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Note legali</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-blue-600" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-blue-600" href="#">Cookie Policy</a></li>
              <li><a className="hover:text-blue-600" href="#">Termini e Condizioni</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Accesso</h4>
            <ul className="mt-2 space-y-1">
              <li><a className="hover:text-blue-600" href="#">Area Riservata (Prossimamente)</a></li>
              <li><a className="hover:text-blue-600" href="/contact">Richiedi una quotazione</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} CEAP Componenti. Tutti i diritti riservati.</div>
      </div>
    </footer>
  )
}

export default Footer