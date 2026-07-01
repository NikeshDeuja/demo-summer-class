import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const RentalContext = createContext(null)

const initialBookings = [
  {
    id: 'BR-1048',
    customer: 'Aarav Shrestha',
    car: 'Toyota Corolla Hybrid',
    pickup: 'Kathmandu Airport',
    startDate: '2026-07-03',
    days: 3,
    total: 13500,
    status: 'Confirmed',
  },
  {
    id: 'BR-1049',
    customer: 'Sita Gurung',
    car: 'Hyundai Creta',
    pickup: 'Thamel Branch',
    startDate: '2026-07-05',
    days: 2,
    total: 12400,
    status: 'Pending',
  },
]

export function RentalProvider({ children }) {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCarId, setSelectedCarId] = useState('')
  const [bookings, setBookings] = useState(initialBookings)
  const [favoriteIds, setFavoriteIds] = useState(['corolla-hybrid'])

  useEffect(() => {
    let isMounted = true

    async function loadCars() {
      try {
        const response = await fetch('/cars.json')
        if (!response.ok) {
          throw new Error('Unable to load fleet data')
        }
        const fleet = await response.json()
        if (isMounted) {
          setCars(fleet)
          setSelectedCarId(fleet.find((car) => car.available)?.id ?? fleet[0]?.id ?? '')
          setError('')
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadCars()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedCar = useMemo(
    () => cars.find((car) => car.id === selectedCarId) ?? cars[0] ?? null,
    [cars, selectedCarId],
  )

  const availableCars = useMemo(() => cars.filter((car) => car.available), [cars])

  const stats = useMemo(() => {
    const revenue = bookings.reduce((sum, booking) => sum + booking.total, 0)
    const availability =
      cars.length > 0 ? Math.round((availableCars.length / cars.length) * 100) : 0

    return {
      cars: cars.length,
      available: availableCars.length,
      bookings: bookings.length,
      revenue,
      availability,
    }
  }, [availableCars.length, bookings, cars.length])

  function addBooking(booking) {
    const newBooking = {
      ...booking,
      id: `BR-${Date.now().toString().slice(-5)}`,
      status: 'Pending',
    }
    setBookings((currentBookings) => [newBooking, ...currentBookings])
    return newBooking
  }

  function toggleFavorite(carId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(carId)
        ? currentIds.filter((id) => id !== carId)
        : [...currentIds, carId],
    )
  }

  const value = {
    cars,
    loading,
    error,
    selectedCar,
    selectedCarId,
    setSelectedCarId,
    availableCars,
    stats,
    bookings,
    addBooking,
    favoriteIds,
    toggleFavorite,
  }

  return <RentalContext.Provider value={value}>{children}</RentalContext.Provider>
}

export function useRental() {
  const context = useContext(RentalContext)
  if (!context) {
    throw new Error('useRental must be used inside RentalProvider')
  }
  return context
}
