import { Search, SlidersHorizontal } from 'lucide-react'

export default function SearchFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <section className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_220px]">
        <label className="relative block">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by model, fuel, or location"
            className="focus-ring h-11 w-full rounded-md border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400"
          />
        </label>

        <label className="relative block">
          <SlidersHorizontal
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
          />
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="focus-ring h-11 w-full appearance-none rounded-md border border-zinc-200 bg-white pl-10 pr-3 text-sm font-medium text-zinc-900"
          >
            <option value="All">All categories</option>
            {categories.map((categoryName) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
