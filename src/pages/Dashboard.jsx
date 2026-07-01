import { Banknote, CalendarCheck, CarFront, Percent, Sparkles } from 'lucide-react'
import BookingForm from '../components/BookingForm.jsx'
import Button from '../components/Button.jsx'
import CarCard from '../components/CarCard.jsx'
import StatCard from '../components/StatCard.jsx'
import { useRental } from '../context/RentalContext.jsx'

export default function Dashboard() {
  const {
    cars,
    bookings,
    favoriteIds,
    loading,
    selectedCar,
    setSelectedCarId,
    stats,
    toggleFavorite,
  } = useRental()

  const featuredCars = cars.filter((car) => car.featured).slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-md bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                <Sparkles aria-hidden="true" className="h-4 w-4" />
                Fleet desk
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold text-zinc-950 sm:text-4xl">
                Manage car availability, reservations, and customer handoffs.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                Track daily bookings, pick the right car, and create reservations from one
                focused dashboard.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button icon={CalendarCheck} onClick={() => window.scrollTo({ top: 640, behavior: 'smooth' })}>
                  New reservation
                </Button>
                <Button icon={CarFront} variant="secondary" onClick={() => setSelectedCarId(cars[0]?.id ?? '')}>
                  Reset selection
                </Button>
              </div>
            </div>

            {selectedCar ? (
              <div className="overflow-hidden rounded-md border border-zinc-200 bg-zinc-50">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.model}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-zinc-500">Selected car</p>
                  <h3 className="mt-1 text-xl font-bold text-zinc-950">{selectedCar.model}</h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    NPR {selectedCar.pricePerDay.toLocaleString()} per day
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <BookingForm />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Fleet size"
          value={stats.cars}
          detail="Total vehicles in system"
          icon={CarFront}
          tone="teal"
        />
        <StatCard
          label="Available"
          value={stats.available}
          detail="Ready for immediate booking"
          icon={CalendarCheck}
          tone="blue"
        />
        <StatCard
          label="Bookings"
          value={stats.bookings}
          detail="Current reservation records"
          icon={Percent}
          tone="amber"
        />
        <StatCard
          label="Revenue"
          value={`NPR ${stats.revenue.toLocaleString()}`}
          detail="Recorded booking value"
          icon={Banknote}
          tone="rose"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
                Featured fleet
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-950">Popular rentals</h2>
            </div>
          </div>

          {loading ? (
            <div className="rounded-md border border-zinc-200 bg-white p-5 text-zinc-500">
              Loading fleet...
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isSelected={selectedCar?.id === car.id}
                  isFavorite={favoriteIds.includes(car.id)}
                  onSelect={setSelectedCarId}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>

        <section className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
            Recent bookings
          </p>
          <h2 className="mt-1 text-2xl font-bold text-zinc-950">Reservation queue</h2>
          <div className="mt-4 space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <article key={booking.id} className="rounded-md border border-zinc-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-zinc-950">{booking.customer}</p>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-bold ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-zinc-600">{booking.car}</p>
                <p className="mt-2 text-sm font-semibold text-zinc-950">
                  {booking.startDate} - {booking.days} day{booking.days > 1 ? 's' : ''}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
