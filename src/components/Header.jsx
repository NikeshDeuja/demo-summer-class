import { CalendarCheck, CarFront, Info, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useRental } from '../context/RentalContext.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/fleet', label: 'Fleet', icon: CarFront },
  { to: '/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/about', label: 'About', icon: Info },
]

export default function Header() {
  const { stats } = useRental()

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-teal-700 text-white shadow-sm">
            <CarFront aria-hidden="true" className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              Car Rental System
            </p>
            <h1 className="text-lg font-bold text-zinc-950 sm:text-xl">Rentora Fleet Desk</h1>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-zinc-950 text-white'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100'
                }`
              }
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          <span className="font-semibold text-zinc-950">{stats.available}</span>
          <span>available today</span>
        </div>
      </div>
    </header>
  )
}
