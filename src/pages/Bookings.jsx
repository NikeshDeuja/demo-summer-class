import { CalendarDays } from 'lucide-react'
import BookingForm from '../components/BookingForm.jsx'
import { useRental } from '../context/RentalContext.jsx'

export default function Bookings() {
  const { bookings } = useRental()

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <BookingForm />

      <section className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
              Bookings
            </p>
            <h2 className="mt-1 text-2xl font-bold text-zinc-950">Reservation records</h2>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-md bg-teal-50 text-teal-700">
            <CalendarDays aria-hidden="true" className="h-5 w-5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr className="text-zinc-500">
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Booking ID</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Customer</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Car</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Pickup</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Start</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Total</th>
                <th className="border-b border-zinc-200 px-3 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-zinc-700">
                  <td className="border-b border-zinc-100 px-3 py-3 font-bold text-zinc-950">
                    {booking.id}
                  </td>
                  <td className="border-b border-zinc-100 px-3 py-3">{booking.customer}</td>
                  <td className="border-b border-zinc-100 px-3 py-3">{booking.car}</td>
                  <td className="border-b border-zinc-100 px-3 py-3">{booking.pickup}</td>
                  <td className="border-b border-zinc-100 px-3 py-3">
                    {booking.startDate} ({booking.days}d)
                  </td>
                  <td className="border-b border-zinc-100 px-3 py-3 font-semibold text-zinc-950">
                    NPR {booking.total.toLocaleString()}
                  </td>
                  <td className="border-b border-zinc-100 px-3 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${
                        booking.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
