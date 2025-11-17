import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { WhatWeDo, WhyUs, ProcessMini, BrandsAndTypes, Ceap20Teaser, Testimonials, FinalCTA } from './components/Sections'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <WhyUs />
        <ProcessMini />
        <BrandsAndTypes />
        <Ceap20Teaser />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
