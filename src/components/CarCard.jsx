import { CheckCircle2, Fuel, Gauge, Heart, MapPin, Star, Users } from 'lucide-react'
import Button from './Button.jsx'

export default function CarCard({
  car,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <article
      className={`overflow-hidden rounded-md border bg-white shadow-sm transition ${
        isSelected ? 'border-teal-500 ring-2 ring-teal-100' : 'border-zinc-200'
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200">
        <img
          src={car.image}
          alt={car.model}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <button
          type="button"
          title={isFavorite ? 'Remove favorite' : 'Add favorite'}
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
          onClick={() => onToggleFavorite(car.id)}
          className={`focus-ring absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-md border border-white/70 bg-white/90 transition hover:bg-white ${
            isFavorite ? 'text-rose-600' : 'text-zinc-600'
          }`}
        >
          <Heart aria-hidden="true" className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <span
          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold ${
            car.available ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
          }`}
        >
          {car.available ? 'Available' : 'Booked'}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-zinc-950">{car.model}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {car.location}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-700">
            <Star aria-hidden="true" className="h-4 w-4" fill="currentColor" />
            {car.rating}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-zinc-600">
          <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-2">
            <Users aria-hidden="true" className="h-4 w-4 text-zinc-500" />
            {car.seats}
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-2">
            <Gauge aria-hidden="true" className="h-4 w-4 text-zinc-500" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1.5 rounded-md bg-zinc-50 px-2 py-2">
            <Fuel aria-hidden="true" className="h-4 w-4 text-zinc-500" />
            {car.fuel}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p>
            <span className="text-2xl font-bold text-zinc-950">NPR {car.pricePerDay}</span>
            <span className="text-sm text-zinc-500"> / day</span>
          </p>
          <Button
            icon={CheckCircle2}
            variant={car.available ? 'primary' : 'secondary'}
            disabled={!car.available}
            onClick={() => onSelect(car.id)}
            className={!car.available ? 'cursor-not-allowed opacity-60' : ''}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        </div>
      </div>
    </article>
  )
}
