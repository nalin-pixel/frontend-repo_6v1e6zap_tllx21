import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/about', label: 'Chi siamo' },
  { to: '/services', label: 'Servizi' },
  { to: '/components', label: 'Componenti' },
  { to: '/how-we-work', label: 'Come lavoriamo' },
  { to: '/ceap20', label: 'CEAP 2.0' },
  { to: '/resources', label: 'Risorse' },
  { to: '/contact', label: 'Contatti' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-blue-600 text-white grid place-items-center font-bold">C</div>
            <span className="font-semibold text-slate-800">CEAP Componenti</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+39000000000" className="text-slate-600 hover:text-blue-600" aria-label="Chiama">
              <span className="i lucide-phone" />📞
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-blue-700"
            >
              Richiedi una quotazione
            </Link>
          </div>
          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none cursor-pointer rounded-md border px-3 py-2 text-sm">Menu</summary>
              <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white p-2 shadow-lg">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded px-3 py-2 text-sm hover:bg-slate-50 ${isActive ? 'text-blue-600' : 'text-slate-700'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-2 block rounded bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Richiedi una quotazione
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
