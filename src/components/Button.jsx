export default function Button({
  children,
  icon: Icon,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800 shadow-sm shadow-teal-900/20',
    secondary: 'bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-200',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-900/20',
    quiet: 'bg-transparent text-zinc-700 hover:bg-zinc-100',
  }

  return (
    <button
      type={type}
      className={`focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
    </button>
  )
}
