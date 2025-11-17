import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import { About, Services, ServiceDetail, Components, HowWeWork, Ceap20, Resources, Contact } from './components/Pages'
import Test from './Test'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/agency" element={<ServiceDetail kind="agency" />} />
        <Route path="/services/resale" element={<ServiceDetail kind="resale" />} />
        <Route path="/services/logistics" element={<ServiceDetail kind="logistics" />} />
        <Route path="/services/special-quotes" element={<ServiceDetail kind="special-quotes" />} />
        <Route path="/components" element={<Components />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/ceap20" element={<Ceap20 />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
