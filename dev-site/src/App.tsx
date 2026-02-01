

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  Code2,
  ShoppingCart,
  Rocket,
  MessageCircle,
  Mail,
  Linkedin,
  Menu,
  X,
  ShieldCheck,
  Smartphone,
  Zap,
  Coffee,
  LayoutTemplate
} from 'lucide-react';

/* -----------------------------------------------------------------------
  THEME CONFIGURATION
  Switched to a "Warm Professional" palette (Stone/Emerald/Orange)
  to feel more human and less corporate.
  -----------------------------------------------------------------------
*/

const THEME = {
  bgMain: "bg-stone-50",       // Warmer than pure white
  bgCard: "bg-white",
  textPrimary: "text-stone-900",
  textSecondary: "text-stone-600",
  primary: "bg-emerald-900",   // Deep Green for trust/money
  primaryHover: "hover:bg-emerald-800",
  accent: "text-orange-600",   // Energetic orange for highlights
  accentBg: "bg-orange-600",
  border: "border-stone-200"
};

// Types for strict data handling
interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  highlight?: boolean;
  note?: string;
}

const PRICING_DATA: PricingPlan[] = [
  {
    title: "Starter Website",
    price: "₹7,000 – ₹10,000",
    description: "For new businesses testing their idea.",
    features: [
      { text: "1–3 pages (Home, About, Contact)", included: true },
      { text: "Clean & simple layout", included: true },
      { text: "Mobile-responsive design", included: true },
      { text: "Fast static website", included: true },
      { text: "Basic on-page SEO", included: true },
      { text: "Custom design iterations", included: false },
      { text: "Backend / Admin panel", included: false },
    ]
  },
  {
    title: "Business Website",
    price: "₹12,000 – ₹18,000",
    description: "For serious small businesses looking to scale.",
    highlight: true, // This drives the UI emphasis
    features: [
      { text: "4–6 professionally designed pages", included: true },
      { text: "Custom UI (No templates)", included: true },
      { text: "Optimized performance", included: true },
      { text: "Contact / Lead form", included: true },
      { text: "1 month free post-launch support", included: true },
      { text: "Hosting guidance & setup", included: true },
      { text: "E-commerce & payments", included: false },
      { text: "Paid tools / Domain fees", included: false },
    ]
  },
  {
    title: "E-commerce Website",
    price: "Starts at ₹25,000",
    description: "Custom store for selling products online.",
    note: "Final cost depends on features.",
    features: [
      { text: "Limited product listing", included: true },
      { text: "Cart & Checkout integration", included: true },
      { text: "Payment gateway integration", included: true },
      { text: "Admin panel (Orders/Products)", included: true },
      { text: "Scalable structure", included: true },
      { text: "VPS / Server costs", included: false },
    ]
  }
];

/* -----------------------------------------------------------------------
  HELPER FUNCTIONS
  -----------------------------------------------------------------------
*/

const scrollToSection = (id: string) => {
  try {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error("Navigation error:", error);
  }
};

/* -----------------------------------------------------------------------
  SUB-COMPONENTS
  -----------------------------------------------------------------------
*/

const SectionHeading = ({ title, subtitle, align = "center" }: { title: string; subtitle?: string, align?: "center" | "left" }) => (
  <div className={`mb-12 ${align === "center" ? "text-center mx-auto" : "text-left"} max-w-2xl`}>
    <h2 className={`text-3xl md:text-4xl font-serif font-bold ${THEME.textPrimary} tracking-tight mb-4`}>
      {title}
    </h2>
    {subtitle && <p className={`text-lg ${THEME.textSecondary} leading-relaxed`}>{subtitle}</p>}
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className={`p-8 rounded-xl border ${THEME.border} ${THEME.bgCard} shadow-sm hover:shadow-md transition-shadow duration-300`}>
    <div className={`w-12 h-12 ${THEME.bgMain} rounded-lg flex items-center justify-center mb-6 text-emerald-800`}>
      <Icon size={24} />
    </div>
    <h3 className={`text-xl font-bold ${THEME.textPrimary} mb-3`}>{title}</h3>
    <p className={`${THEME.textSecondary} leading-relaxed`}>{desc}</p>
  </div>
);

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div className={`relative p-8 rounded-2xl border flex flex-col h-full bg-white transition-transform duration-300 hover:-translate-y-1 ${plan.highlight
        ? 'border-emerald-600 ring-1 ring-emerald-600 shadow-xl'
        : 'border-stone-200 shadow-sm'
      }`}>
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase">
          Best Value
        </div>
      )}

      <div className="mb-8 pt-2">
        <h3 className="text-xl font-bold text-emerald-950 mb-2">{plan.title}</h3>
        <p className="text-stone-500 text-sm mb-6 h-10 leading-snug">{plan.description}</p>
        <div className="text-3xl font-bold text-stone-900 tracking-tight">{plan.price}</div>
        {plan.note && <p className="text-xs text-orange-700 mt-2 font-medium">{plan.note}</p>}
      </div>

      <div className="flex-grow space-y-4 mb-8">
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-3 text-sm">
            {feature.included ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-stone-300 flex-shrink-0 mt-0.5" />
            )}
            <span className={feature.included ? "text-stone-700 font-medium" : "text-stone-400 line-through"}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollToSection('contact')}
        className={`w-full py-4 rounded-lg font-bold tracking-wide transition-colors ${plan.highlight
            ? 'bg-emerald-900 text-white hover:bg-emerald-800'
            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
      >
        Choose Plan
      </button>
    </div>
  );
};

/* -----------------------------------------------------------------------
  MAIN APPLICATION
  -----------------------------------------------------------------------
*/

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${THEME.bgMain} font-sans ${THEME.textPrimary} selection:bg-orange-200 selection:text-orange-900`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight flex items-center gap-2 text-emerald-950">
            <span className="w-9 h-9 bg-emerald-900 rounded-lg flex items-center justify-center text-white font-serif">Q</span>
            Quickwish Studio
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button onClick={() => scrollToSection('services')} className="hover:text-emerald-900 transition-colors">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="hover:text-emerald-900 transition-colors">Why Us</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-emerald-900 transition-colors">Process</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-emerald-900 transition-colors">Pricing</button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-lg hover:bg-orange-700 transition-colors shadow-sm font-semibold"
            >
              Contact Shiva
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-stone-800 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-100 px-6 py-6 space-y-4 shadow-xl">
            <button onClick={() => { scrollToSection('services'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 border-b border-stone-50">Services</button>
            <button onClick={() => { scrollToSection('pricing'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 border-b border-stone-50">Pricing</button>
            <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-3 text-orange-600 font-bold">Start a Project</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Open for new projects
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.1] tracking-tight">
              Honest websites for <span className="text-emerald-800">small businesses.</span>
            </h1>

            <p className="text-xl text-stone-600 leading-relaxed max-w-lg">
              We build fast, simple websites for founders who care about their budget. No templates. No hidden monthly fees.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => scrollToSection('pricing')}
                className="px-8 py-4 bg-emerald-900 text-white rounded-xl font-semibold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
              >
                See Fixed Pricing <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="px-8 py-4 bg-white border border-stone-300 text-stone-800 rounded-xl font-semibold hover:bg-stone-50 transition-all"
              >
                How It Works
              </button>
            </div>

            <p className="text-sm text-stone-500 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              100% Transparent. You own your code.
            </p>
          </div>

          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-60 z-0"></div>

            {/* Unsplash Image: Modern Workspace/Laptop */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Modern workspace desk"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-stone-900/80 to-transparent p-6 text-white">
                <p className="font-medium">Designed for real growth.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- WHAT WE DO --- */}
      <section id="services" className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Practical Web Services"
            subtitle="We don't do 'crypto-AI-blockchain' buzzwords. We build tools that help you sell."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Smartphone}
              title="Business Websites"
              desc="Fast, informational sites that work perfectly on mobile. Ideal for consultants, local shops, and clinics."
            />
            <FeatureCard
              icon={LayoutTemplate}
              title="Landing Pages & MVPs"
              desc="Single-page sites designed to capture leads or test a new startup idea quickly."
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Starter E-commerce"
              desc="Simple online stores. We set up the payments and product pages so you can start selling immediately."
            />
          </div>
        </div>
      </section>

      {/* --- WHY US (DIFFERENTIATION) --- */}
      <section id="why-us" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              {/* Unsplash Image: Hands working/Collaborating */}
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Collaboration"
                className="rounded-2xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-emerald-900 text-white p-6 rounded-xl shadow-lg max-w-xs hidden lg:block">
                <p className="text-sm font-medium">"Simplicity is the ultimate sophistication."</p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-md mb-4 uppercase tracking-wide">
                The Quickwish Difference
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Why are we different from agencies?
              </h2>
              <div className="space-y-6">
                {[
                  { title: "No Scope Creep", desc: "We define exactly what we are building before you pay 1 rupee." },
                  { title: "Direct Access", desc: "You talk to Shiva (the dev), not a salesperson who doesn't code." },
                  { title: "Speed Focused", desc: "We use static site technology. It loads instantly and is unhackable." },
                  { title: "Owner Friendly", desc: "We teach you how to handle your site after we leave." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">{item.title}</h4>
                      <p className="text-stone-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section id="process" className="py-24 px-6 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How we work</h2>
            <p className="text-emerald-200 text-lg">From WhatsApp message to Live Website.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Idea", desc: "You WhatsApp us your requirement." },
              { step: "02", title: "Scope", desc: "We give a fixed price quote." },
              { step: "03", title: "Build", desc: "We code while you sleep." },
              { step: "04", title: "Launch", desc: "Handover & Go Live. 🚀" },
            ].map((item, i) => (
              <div key={i} className="bg-emerald-800/50 border border-emerald-700 p-6 rounded-2xl text-center backdrop-blur-sm hover:bg-emerald-800 transition-colors">
                <div className="w-10 h-10 mx-auto bg-orange-500 text-white rounded-full flex items-center justify-center font-bold mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-emerald-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Transparent Pricing"
            subtitle="No negotiations. No hidden costs. Just honest work."
          />

          <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
            {PRICING_DATA.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="flex items-center gap-2 font-bold text-stone-900 mb-3 text-lg">
                  <ShieldCheck className="text-emerald-600" size={24} />
                  Anti-Negotiation Policy
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To keep our quality high, we do not discount. If a budget is tight, we reduce the scope (number of pages/features) rather than reducing the quality of code.
                </p>
              </div>
              <div className="w-px bg-stone-200 hidden md:block"></div>
              <div className="flex-1">
                <h4 className="flex items-center gap-2 font-bold text-stone-900 mb-3 text-lg">
                  <Zap className="text-orange-600" size={24} />
                  Payment Schedule
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  30% Advance to book the slot. Remaining 70% after the demo is approved, but before the final source code handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-24 px-6 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-28 h-28 bg-stone-200 rounded-full mx-auto mb-8 overflow-hidden border-4 border-white shadow-lg">
            {/* Unsplash Image: Friendly individual (Placeholder for User) */}
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQFZJ_sPtJYIwA/profile-displayphoto-scale_200_200/B56ZwJkr8UK0Ac-/0/1769687141155?e=1771459200&v=beta&t=2orPBrfQxfkYfgxFnspth5-RC97c283X3TX5r22tjTY"
              alt="Shiva - Founder"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-6">
            Hi, I’m Shiva.
          </h2>

          <p className="text-lg text-stone-800 mb-8 leading-relaxed">
            I’m a computer science graduate and full-stack developer based in Indore.
            I work with small business owners and founders who want a clean, fast website
            without paying for features they don’t actually need.
            <br /><br />
            I started Quickwish Studio to build practical, modern websites
            that focus on clarity, performance, and long-term value.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 rounded-lg text-stone-600 font-mono text-sm">
            <Code2 size={16} />
            Modern Full-Stack Development

          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <footer id="contact" className="bg-stone-900 text-stone-400 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to start?</h2>
          <p className="mb-10 max-w-lg mx-auto">
            Send a message with your idea. No sales pressure.
          </p>

          {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a href="#" className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-colors font-bold">
              <MessageCircle size={20} />
              WhatsApp Me
            </a>
            <a href="mailto:hello@quickwish.com" className="flex items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 text-white px-8 py-4 rounded-xl transition-colors font-bold border border-stone-700">
              <Mail size={20} />
              Email
            </a>
            <a href="#" className="flex items-center justify-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-8 py-4 rounded-xl transition-colors font-bold">
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div> */}

  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
  {/* WhatsApp */}
  <a
    href="https://wa.me/919009917146"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition-colors font-bold"
  >
    <MessageCircle size={20} />
    WhatsApp Me
  </a>

  {/* Email */}
  <a
    href="mailto:shivakushwah144@gmail.com"
    className="flex items-center justify-center gap-3 bg-stone-800 hover:bg-stone-700 text-white px-8 py-4 rounded-xl transition-colors font-bold border border-stone-700"
  >
    <Mail size={20} />
    Email
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/shiva-kushwah-53a095297/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-8 py-4 rounded-xl transition-colors font-bold"
  >
    <Linkedin size={20} />
    LinkedIn
  </a>
</div>

          <div className="pt-8 border-t border-stone-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Quickwish Studio. Indore, India.</p>
            <p className="flex items-center gap-2">
              <Coffee size={14} />
              Built with React & Honesty.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;