import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import About from './pages/About.jsx'
import Bookings from './pages/Bookings.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Fleet from './pages/Fleet.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f8fb] text-zinc-950">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
