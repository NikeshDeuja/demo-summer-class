import { Boxes, GitBranch, LockKeyhole, Route } from 'lucide-react'

const modules = [
  {
    title: 'Frontend',
    detail: 'React pages, reusable components, responsive layout, and customer-facing forms.',
    icon: Boxes,
  },
  {
    title: 'Routing',
    detail: 'Dashboard, fleet, bookings, and about pages connected with react-router-dom.',
    icon: Route,
  },
  {
    title: 'Security',
    detail: 'Clear booking validation, predictable form handling, and future-ready access control.',
    icon: LockKeyhole,
  },
  {
    title: 'Version Control',
    detail: 'Project structure is ready for Git commits, branches, and GitHub publishing.',
    icon: GitBranch,
  },
]

export default function About() {
  return (
    <div className="space-y-6">
      <section className="rounded-md border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700">
          Project scope
        </p>
        <h2 className="mt-2 text-3xl font-bold text-zinc-950">Car Rental System</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600">
          This frontend manages rental fleet browsing, vehicle selection, reservation
          creation, and booking records for a car rental business.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {modules.map(({ title, detail, icon: Icon }) => (
          <article key={title} className="rounded-md border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-md bg-teal-50 text-teal-700">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-950">{title}</h3>
            <p className="mt-2 leading-7 text-zinc-600">{detail}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
