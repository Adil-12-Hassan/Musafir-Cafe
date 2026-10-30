import { Link } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/track', label: 'Track an order' },
  { to: '/about', label: 'Our story' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-[#f4f0e9]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:py-16">
        <div>
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-brand-dark">
            Musafir Cafe
          </Link>
          <p className="mt-3 max-w-sm font-display text-base italic leading-relaxed text-brand-muted">
            A little pause along the way. Good coffee, warm company, and room to stay awhile.
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dark">Explore</h2>
          <nav aria-label="Footer navigation" className="mt-4 flex flex-col items-start gap-3">
            {LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="text-sm text-brand-muted transition-colors hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-dark">Visit us</h2>
          <address className="mt-4 flex flex-col gap-3 text-sm not-italic text-brand-muted">
            <a href="https://maps.google.com/?q=Jinnah+Colony+Faisalabad" target="_blank" rel="noreferrer" className="transition-colors hover:text-brand-dark">
              Jinnah Colony, Faisalabad <span aria-hidden="true">↗</span>
            </a>
            <a href="tel:+923090169035" className="transition-colors hover:text-brand-dark">+92 309 0169035</a>
          </address>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Musafir Cafe. All rights reserved.</span>
          <span className="font-display italic">Keep moving. Keep growing.</span>
        </div>
      </div>
    </footer>
  );
}
