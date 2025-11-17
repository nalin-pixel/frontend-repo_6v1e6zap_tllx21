import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Componenti elettronici e soluzioni su misura per la tua azienda
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Agenzia e rivendita: dalla ricerca dei componenti alla comparazione fornitori, fino alla consegna. Anche per componenti rari o difficili da reperire.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/contact" className="rounded-md bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700">
                Invia la tua richiesta componenti
              </Link>
              <Link to="/how-we-work" className="rounded-md border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50">
                Scopri come lavoriamo
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl bg-white shadow-lg ring-1 ring-slate-200 p-6 grid place-items-center">
              <div className="grid grid-cols-3 gap-4 w-full">
                {["Diodi","MOSFET","IC","MCU","Fusibili","Connettori","Passivi","Relè","Cristalli"].map((t) => (
                  <div key={t} className="rounded-lg border bg-slate-50 p-3 text-center text-sm text-slate-700">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
