import { CalendarDays, MapPinned, Plus, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useRental } from '../context/RentalContext.jsx'
import Button from './Button.jsx'

const today = '2026-07-01'

export default function BookingForm() {
  const { cars, selectedCar, selectedCarId, setSelectedCarId, addBooking } = useRental()
  const [form, setForm] = useState({
    customer: '',
    phone: '',
    pickup: 'Kathmandu Airport',
    startDate: today,
    days: 1,
  })
  const [message, setMessage] = useState('')

  const total = useMemo(() => {
    const days = Number(form.days) || 1
    return selectedCar ? selectedCar.pricePerDay * days : 0
  }, [form.days, selectedCar])

  function updateField(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!selectedCar || !form.customer || !form.phone || !form.pickup || !form.startDate) {
      setMessage('Please complete all booking fields.')
      return
    }

    const booking = addBooking({
      customer: form.customer,
      phone: form.phone,
      car: selectedCar.model,
      pickup: form.pickup,
      startDate: form.startDate,
      days: Number(form.days),
      total,
    })

    setMessage(`${booking.id} created for ${booking.customer}.`)
    setForm({
      customer: '',
      phone: '',
      pickup: 'Kathmandu Airport',
      startDate: today,
      days: 1,
    })
  }

  return (
    <section className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          Booking
        </p>
        <h2 className="mt-1 text-2xl font-bold text-zinc-950">Reserve a car</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <UserRound aria-hidden="true" className="h-4 w-4 text-zinc-500" />
            Customer name
          </span>
          <input
            value={form.customer}
            onChange={(event) => updateField('customer', event.target.value)}
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
            placeholder="Enter customer name"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Phone</span>
          <input
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
            placeholder="98XXXXXXXX"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Car</span>
          <select
            value={selectedCarId}
            onChange={(event) => setSelectedCarId(event.target.value)}
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id} disabled={!car.available}>
                {car.model} - NPR {car.pricePerDay}/day
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-zinc-700">
            <MapPinned aria-hidden="true" className="h-4 w-4 text-zinc-500" />
            Pickup location
          </span>
          <select
            value={form.pickup}
            onChange={(event) => updateField('pickup', event.target.value)}
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
          >
            <option>Kathmandu Airport</option>
            <option>Thamel Branch</option>
            <option>Lalitpur Hub</option>
            <option>Pokhara Desk</option>
          </select>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-zinc-700">
              <CalendarDays aria-hidden="true" className="h-4 w-4 text-zinc-500" />
              Start date
            </span>
            <input
              type="date"
              min={today}
              value={form.startDate}
              onChange={(event) => updateField('startDate', event.target.value)}
              className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-zinc-700">Days</span>
            <input
              type="number"
              min="1"
              max="30"
              value={form.days}
              onChange={(event) => updateField('days', event.target.value)}
              className="focus-ring h-11 w-full rounded-md border border-zinc-200 px-3 text-sm"
            />
          </label>
        </div>

        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Estimated total</p>
          <p className="mt-1 text-2xl font-bold text-zinc-950">NPR {total.toLocaleString()}</p>
        </div>

        <Button type="submit" icon={Plus} className="w-full">
          Add booking
        </Button>
      </form>

      {message ? (
        <p className="mt-4 rounded-md bg-teal-50 px-3 py-2 text-sm font-medium text-teal-800">
          {message}
        </p>
      ) : null}
    </section>
  )
}
