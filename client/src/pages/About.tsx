import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import SiteFooter from '../components/SiteFooter';

export default function About() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <CartSidebar />

      {/* Hero strip */}
      <div className="pt-24 pb-16 bg-brand-accent text-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">About Us</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
            The story of<br />
            <span className="italic opacity-80">a traveller's cafe.</span>
          </h1>
          <p className="mt-6 text-white/70 text-base leading-relaxed max-w-xl">
            Musafir means traveller. That word is at the heart of everything we do - from the name on our cups to the stories shared at our counter.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        {/* Origin story */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-0.5 bg-brand-accent mb-6" />
            <h2 className="font-display text-3xl font-bold text-brand-dark mb-5">
              From a cart on a street corner.
            </h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              Before there was a cafe, there was a cart. Parked at the edge of Jinnah Colony in Faisalabad, that cart served one thing: coffee, made well, with care. People stopped. They sipped. They stayed a little longer than they meant to.
            </p>
            <p className="text-brand-muted leading-relaxed">
              That cart was the seed. What grew from it wasn't just a business - it was a place where people on different journeys could pause, together.
            </p>
          </div>
          <div
            className="h-64 flex items-center justify-center rounded"
            style={{
              background: 'linear-gradient(135deg, #3d2b1f 0%, #5a3d2b 100%)',
              boxShadow: '0 16px 48px rgba(61,43,31,0.3)',
            }}
          >
            <div className="text-center text-white">
              <span className="text-7xl block">☕</span>
              <p className="font-display italic text-lg mt-3 opacity-80">The first cup.</p>
              <p className="text-xs opacity-50 mt-1 uppercase tracking-widest">Jinnah Colony, Faisalabad</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="text-center mb-12">
            <div className="w-8 h-0.5 bg-brand-accent mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-brand-dark">What we believe in</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧭',
                title: 'Keep Moving',
                desc: "Life is a journey, not a destination. We don't believe in standing still - we believe in the next step forward.",
              },
              {
                icon: '🤝',
                title: 'Connection',
                desc: 'A great cup of coffee is an excuse to slow down and be present with someone. Every order we make carries that intention.',
              },
              {
                icon: '✦',
                title: 'Craft',
                desc: "We take pride in what we make. From the first pull of espresso to the final pour, the quality in your cup is something we stand behind.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-white border border-brand-border p-8">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-display text-lg font-bold text-brand-dark mb-3">{v.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Drinks section */}
        <section className="border-t border-brand-border pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-4">The Menu</p>
              <h2 className="font-display text-3xl font-bold text-brand-dark mb-5">
                Every drink is a story.
              </h2>
              <p className="text-brand-muted leading-relaxed mb-4">
                Our drinks aren't just beverages - each one has a character, a mood, a moment it was made for. The Spanish Sip for the bold explorer. The Vanilla Vibe for the quiet dreamer. The Caramel Cloud for those who deserve something sweet.
              </p>
              <p className="text-brand-muted leading-relaxed mb-8">
                We start with quality ingredients and build up from there. No shortcuts. No compromise.
              </p>
              <Link
                to="/menu"
                className="inline-block bg-brand-dark text-brand-cream px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                View Our Menu →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Spanish Sip', 'Honey Latte', 'Caramel Cloud', 'Vanilla Vibe'].map((drink, i) => (
                <div
                  key={drink}
                  className="bg-white border border-brand-border px-4 py-6 text-center hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl block mb-2">
                    {i === 0 ? '🇪🇸' : i === 1 ? '🍯' : i === 2 ? '☁️' : '🌿'}
                  </span>
                  <p className="font-display text-sm font-bold text-brand-dark">{drink}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="text-center py-8">
          <div className="w-8 h-0.5 bg-brand-accent mx-auto mb-8" />
          <blockquote className="font-display text-3xl font-bold italic text-brand-dark leading-relaxed max-w-2xl mx-auto">
            "Thank you for being a part of the Musafir journey."
          </blockquote>
          <p className="text-brand-muted text-sm mt-6 uppercase tracking-widest">
            Musafir Cafe · Jinnah Colony, Faisalabad
          </p>
          <p className="text-brand-muted text-sm mt-1">📞 03090169035</p>
        </section>

        {/* CTA */}
        <section className="bg-brand-accent text-white p-10 text-center">
          <h3 className="font-display text-2xl font-bold mb-3">Ready to order?</h3>
          <p className="text-white/70 mb-6 text-sm">Browse our full menu and start your journey.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              to="/menu"
              className="bg-white text-brand-accent px-8 py-3 text-xs font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              View Menu
            </Link>
            <Link
              to="/track"
              className="border border-white/40 text-white px-8 py-3 text-xs font-medium uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Track Order
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
