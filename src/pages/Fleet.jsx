import { useMemo, useState } from 'react'
import CarCard from '../components/CarCard.jsx'
import SearchFilters from '../components/SearchFilters.jsx'
import { useRental } from '../context/RentalContext.jsx'

export default function Fleet() {
  const {
    cars,
    error,
    favoriteIds,
    loading,
    selectedCar,
    setSelectedCarId,
    toggleFavorite,
  } = useRental()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => [...new Set(cars.map((car) => car.category))].sort(),
    [cars],
  )

  const filteredCars = useMemo(() => {
    const term = search.trim().toLowerCase()
    return cars.filter((car) => {
      const matchesCategory = category === 'All' || car.category === category
      const matchesSearch =
        !term ||
        `${car.model} ${car.fuel} ${car.location} ${car.category}`.toLowerCase().includes(term)

      return matchesCategory && matchesSearch
    })
  }, [cars, category, search])

  return (
    <div className="space-y-5">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          Fleet
        </p>
        <h2 className="mt-1 text-3xl font-bold text-zinc-950">Vehicle catalog</h2>
      </section>

      <SearchFilters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {error ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-800">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-md border border-zinc-200 bg-white p-5 text-zinc-500">
          Loading cars...
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isSelected={selectedCar?.id === car.id}
              isFavorite={favoriteIds.includes(car.id)}
              onSelect={setSelectedCarId}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}

      {!loading && filteredCars.length === 0 ? (
        <div className="rounded-md border border-zinc-200 bg-white p-6 text-center text-zinc-500">
          No cars match the current filters.
        </div>
      ) : null}
    </div>
  )
}
