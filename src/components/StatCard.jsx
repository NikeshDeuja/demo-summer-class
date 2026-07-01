export default function StatCard({ label, value, detail, icon: Icon, tone = 'teal' }) {
  const tones = {
    teal: 'bg-teal-50 text-teal-700 ring-teal-100',
    amber: 'bg-amber-50 text-amber-700 ring-amber-100',
    blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    rose: 'bg-rose-50 text-rose-700 ring-rose-100',
  }

  return (
    <article className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-zinc-950">{value}</p>
        </div>
        {Icon ? (
          <div className={`rounded-md p-2 ring-1 ${tones[tone]}`}>
            <Icon aria-hidden="true" className="h-5 w-5" />
          </div>
        ) : null}
      </div>
      <p className="mt-4 text-sm text-zinc-500">{detail}</p>
    </article>
  )
}
