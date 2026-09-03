import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowRight, Check, ChevronUp, Heart, Instagram, Linkedin, Mail, Menu, Quote, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Our work' },
  { href: '/impact', label: 'Impact' },
  { href: '/stories', label: 'Stories' },
  { href: '/get-involved', label: 'Get involved' },
];

const programAreas = [
  { name: 'Child Rights', note: 'Safety, agency, and a voice in decisions that affect children.', tone: 'yellow' },
  { name: 'Livelihood', note: 'Practical pathways that help families build stability.', tone: 'terracotta' },
  { name: 'Early Education', note: 'A stronger start through nurturing, inclusive learning.', tone: 'green' },
  { name: 'WASH', note: 'Everyday access to water, sanitation, and hygiene.', tone: 'cream' },
  { name: 'Gender Equality', note: 'Communities where every child can participate and belong.', tone: 'yellow' },
  { name: 'Menstrual Health', note: 'Keeping girls learning, confident, and in school.', tone: 'terracotta' },
];

const impactFigures = [
  ['3,000+', 'Children Empowered'],
  ['4,000+', 'Hygiene Kits Distributed'],
  ['500+', 'Families Stabilized'],
  ['200+', 'Caregivers Trained'],
  ['1,000+', 'Individuals Empowered'],
  ['150+', 'Vulnerable Children Directly Supported'],
  ['3,500+', 'Children Reached Through Caregiver Training'],
  ['100+', 'Families Guided Toward Financial Stability'],
];

function LogoMark() {
  return (
    <span className="flex items-center gap-3" data-testid="brand-logo-placeholder">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f2e782] text-sm font-bold text-[#f2e782]" aria-hidden="true">RP</span>
      <span className="leading-[.95]">
        <span className="block font-display text-[1.15rem]">Right Path</span>
        <span className="block font-mono-ui text-[.55rem] uppercase tracking-[.18em] text-[#cfcbbf]">Initiative</span>
      </span>
    </span>
  );
}

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Right Path Initiative`;
    const setMeta = (key: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('og:title', `${title} | Right Path Initiative`, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', 'Right Path Initiative', true);
    setMeta('twitter:card', 'summary_large_image');
  }, [title, description]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="relative z-30 bg-[#151817] text-[#f4f0e8]" data-testid="site-header">
      <div className="section-wrap flex min-h-[76px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" data-testid="link-home-logo"><LogoMark /></Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`line-link text-sm ${location === item.href ? 'text-[#f2e782]' : 'text-[#cfcbbf] hover:text-[#f4f0e8]'}`} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/contact" className="line-link text-sm text-[#cfcbbf] hover:text-[#f4f0e8]" data-testid="link-nav-contact">Contact</Link>
          <Link href="/donate" className="rounded-full bg-[#f2e782] px-5 py-3 text-sm font-bold text-[#151817] transition-transform hover:-translate-y-0.5" data-testid="link-header-donate">Give with purpose <ArrowRight className="ml-2 inline h-4 w-4" /></Link>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#536b57] lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-[#536b57] bg-[#151817] px-5 pb-7 pt-4 lg:hidden" aria-label="Mobile navigation" data-testid="mobile-navigation">
          <div className="section-wrap flex flex-col">
            {[...navItems, { href: '/contact', label: 'Contact' }].map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-[#536b57]/60 py-4 text-lg" data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}<ArrowUpRight /></Link>
            ))}
            <Link href="/donate" className="mt-5 inline-flex w-fit items-center rounded-full bg-[#f2e782] px-5 py-3 font-bold text-[#151817]" data-testid="link-mobile-donate">Give with purpose <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function ArrowUpRight() {
  return <ArrowDownRight className="float-right h-5 w-5 rotate-[-90deg]" />;
}

function Footer() {
  return (
    <footer className="bg-[#151817] px-5 py-16 text-[#f4f0e8]" data-testid="site-footer">
      <div className="section-wrap">
        <div className="grid gap-12 border-b border-[#536b57] pb-14 md:grid-cols-[1.25fr_.75fr_.75fr]">
          <div>
            <LogoMark />
            <p className="mt-7 max-w-sm font-display text-2xl leading-tight text-[#f2e782]" data-testid="text-footer-tagline">Championing the dignity and potential of every child — one community at a time.</p>
          </div>
          <div>
            <p className="eyebrow text-[#cfcbbf]">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-[#cfcbbf]">
              {navItems.slice(0, 4).map((item) => <Link key={item.href} href={item.href} className="line-link w-fit hover:text-[#f4f0e8]" data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`}>{item.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="eyebrow text-[#cfcbbf]">Stay connected</p>
            <p className="mt-5 max-w-[230px] text-sm leading-6 text-[#cfcbbf]" data-testid="text-contact-placeholder">Official email, telephone, and office address — placeholder pending confirmation.</p>
            <div className="mt-5 flex gap-3" aria-label="Social links placeholder" data-testid="social-links-placeholder">
              <span className="rounded-full border border-[#536b57] p-2.5 text-[#cfcbbf]" aria-label="Instagram placeholder"><Instagram className="h-4 w-4" /></span>
              <span className="rounded-full border border-[#536b57] p-2.5 text-[#cfcbbf]" aria-label="LinkedIn placeholder"><Linkedin className="h-4 w-4" /></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-[#cfcbbf] sm:flex-row">
          <p data-testid="text-footer-note">© Right Path Initiative. Official registration details placeholder.</p>
          <p>Built around dignity, accountability, and hope.</p>
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="grain page-shell bg-[#f4f0e8] text-[#151817]"><a href="#main-content" className="sr-only z-50 rounded bg-[#f2e782] px-3 py-2 text-[#151817] focus:not-sr-only focus:fixed focus:left-4 focus:top-4" data-testid="link-skip-content">Skip to content</a><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></div>;
}

function MediaPlaceholder({ className = '', label = 'Community image' }: { className?: string; label?: string }) {
  return <div className={`media-placeholder ${className}`} role="img" aria-label={`${label}. Approved photography placeholder.`} data-testid={`media-placeholder-${label.toLowerCase().replaceAll(' ', '-')}`}><span className="absolute left-5 top-5 z-10 font-mono-ui text-[.62rem] uppercase tracking-[.16em] text-[#536b57]">{label}</span></div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow text-[#536b57]">{children}</p>;
}

function PageIntro({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-[#cfcbbf] bg-[#f4f0e8] px-5 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="section-wrap grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-end">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div>
          <h1 className="font-display text-5xl leading-[1.04] tracking-[-.035em] md:text-7xl" data-testid="text-page-title">{title}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#536b57]" data-testid="text-page-intro">{intro}</p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Seo title="Every child deserves a safe and dignified future" description="Right Path Initiative works with communities across Uganda to protect children, strengthen families, and create opportunities for every child to thrive." />
      <section className="overflow-hidden bg-[#151817] px-5 pb-16 pt-16 text-[#f4f0e8] md:pb-24 md:pt-24">
        <div className="section-wrap grid gap-14 lg:grid-cols-[1.02fr_.98fr] lg:items-end">
          <div className="reveal">
            <div className="flex items-center gap-3 text-[#f2e782]"><span className="h-px w-10 bg-[#f2e782]" /><span className="eyebrow">Right Path Initiative / Uganda</span></div>
            <h1 className="mt-8 max-w-3xl font-display text-6xl leading-[.98] tracking-[-.05em] text-[#f4f0e8] md:text-8xl" data-testid="text-home-hero-title">Every child deserves a <em className="text-[#f2e782]">safe</em> and dignified future.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#cfcbbf]" data-testid="text-home-hero-copy">Right Path Initiative works with communities across Uganda to protect children, strengthen families, and create opportunities for every child to thrive.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link href="/work" className="inline-flex items-center rounded-full bg-[#f2e782] px-6 py-3.5 font-bold text-[#151817] transition-transform hover:-translate-y-1" data-testid="link-hero-work">See our work <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/about" className="line-link text-sm text-[#f4f0e8]" data-testid="link-hero-about">Why Right Path <ArrowDownRight className="ml-1 inline h-4 w-4 -rotate-90" /></Link>
            </div>
          </div>
          <div className="reveal reveal-delay-2 relative">
            <MediaPlaceholder className="h-[390px] rounded-[45%_45%_6px_6px] border-8 border-[#536b57] md:h-[520px]" label="A child at the centre" />
            <div className="absolute -bottom-6 -left-3 max-w-[190px] rounded-sm bg-[#c9795b] p-5 text-[#f4f0e8] md:-left-8" data-testid="callout-dignity">
              <p className="font-display text-2xl leading-tight">Dignity is where change begins.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f2e782] px-5 py-14" data-testid="section-home-introduction">
        <div className="section-wrap grid gap-8 md:grid-cols-[.8fr_1.2fr]">
          <Eyebrow>Our starting point</Eyebrow>
          <p className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">We believe communities already hold the wisdom, care, and courage to make childhood safer.</p>
        </div>
      </section>
      <section className="px-5 py-20 md:py-28">
        <div className="section-wrap">
          <div className="grid gap-10 border-b border-[#cfcbbf] pb-20 md:grid-cols-[.7fr_1.3fr] md:items-start">
            <div><Eyebrow>01 / Listen first</Eyebrow><p className="mt-7 max-w-xs text-sm leading-6 text-[#536b57]">Our work is shaped with communities, not delivered to them.</p></div>
            <div>
              <h2 className="max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl" data-testid="text-feature-silence-title">Breaking the Silence</h2>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[#536b57]" data-testid="text-feature-silence-copy">Our community sensitization programs spark vital conversations in schools, homes, and places of worship—reaching people where they live and believe.</p>
              <Link href="/work" className="mt-8 inline-flex items-center font-bold text-[#c9795b] hover:text-[#536b57]" data-testid="link-feature-work">Explore child rights work <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
          <div className="grid gap-12 py-20 md:grid-cols-[1fr_1.05fr] md:items-center">
            <MediaPlaceholder className="min-h-[360px] rounded-[6px_36%_6px_6px] md:min-h-[480px]" label="Girls learning together" />
            <div>
              <Eyebrow>02 / Keep learning</Eyebrow>
              <h2 className="mt-7 max-w-2xl font-display text-5xl leading-[1.04] md:text-7xl" data-testid="text-feature-menstrual-title">Every girl deserves to stay in school.</h2>
              <p className="mt-7 max-w-xl text-xl leading-8 text-[#536b57]" data-testid="text-feature-menstrual-copy">Period poverty should never rob a girl of her education. Right Path Initiative is changing that.</p>
              <div className="mt-9 border-l-4 border-[#c9795b] pl-5"><p className="font-display text-2xl leading-tight" data-testid="text-feature-menstrual-highlight">4,000+ menstrual hygiene kits distributed to girls and women across communities.</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#536b57] px-5 py-20 text-[#f4f0e8]" data-testid="section-home-impact">
        <div className="section-wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><Eyebrow>At a glance</Eyebrow><h2 className="mt-5 font-display text-5xl md:text-6xl">Small shifts.<br /><span className="text-[#f2e782]">Lasting change.</span></h2></div><Link href="/impact" className="line-link w-fit text-sm" data-testid="link-home-impact">View approved impact figures <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div>
          <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 border-t border-[#cfcbbf]/40 pt-8 md:grid-cols-4">{impactFigures.slice(0, 4).map(([figure, label], i) => <div key={label} data-testid={`stat-home-${i}`}><p className="font-display text-4xl text-[#f2e782] md:text-5xl">{figure}</p><p className="mt-2 max-w-[150px] text-sm leading-5 text-[#cfcbbf]">{label}</p></div>)}</div>
        </div>
      </section>
      <section className="px-5 py-20 md:py-28">
        <div className="section-wrap grid gap-10 md:grid-cols-[.65fr_1.35fr]"><div><Eyebrow>Where we focus</Eyebrow><p className="mt-6 max-w-xs text-sm leading-6 text-[#536b57]">From prevention to practical support, our programme areas meet children and families at the point of need.</p></div><div className="grid border-t border-[#cfcbbf] sm:grid-cols-2">{programAreas.map((area, i) => <Link key={area.name} href="/work" className="group flex items-center justify-between border-b border-[#cfcbbf] py-6 pr-3 transition-colors hover:bg-[#f2e782]" data-testid={`link-program-${i}`}><span><span className="font-display text-2xl">{area.name}</span><span className="mt-1 block max-w-xs text-sm leading-5 text-[#536b57]">{area.note}</span></span><ArrowDownRight className="h-6 w-6 -rotate-90 transition-transform group-hover:-rotate-45" /></Link>)}</div></div>
      </section>
      <section className="bg-[#c9795b] px-5 py-20 text-[#f4f0e8] md:py-28">
        <div className="section-wrap grid gap-8 md:grid-cols-[1fr_.8fr] md:items-end"><h2 className="max-w-3xl font-display text-5xl leading-[1.03] md:text-7xl">A safe childhood is something we build together.</h2><div><p className="leading-7 text-[#f4f0e8]/85">Choose a way to stand with children and communities across Uganda.</p><Link href="/get-involved" className="mt-7 inline-flex items-center rounded-full bg-[#151817] px-6 py-3.5 font-bold text-[#f4f0e8] hover:bg-[#536b57]" data-testid="link-home-involved">Find your way in <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div>
      </section>
    </>
  );
}

function About() {
  const values = [['01', 'Inclusiveness', 'We make room for every voice, especially the voices most often left out.'], ['02', 'Integrity & Accountability', 'We act honestly, steward resources carefully, and remain answerable to the communities we serve.'], ['03', 'Creativity & Collaboration', 'We try new paths and work alongside others when a better future asks more of us.']];
  return <><Seo title="About us" description="Learn about Right Path Initiative's mission, vision, and values." /><PageIntro eyebrow="About Right Path Initiative" title="A dignified life is every child’s right." intro="We work alongside communities across Uganda to make safety, support, and possibility part of everyday childhood." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-14 md:grid-cols-[.75fr_1.25fr]"><div><Eyebrow>Our reason for being</Eyebrow><MediaPlaceholder className="mt-8 h-[340px] rounded-[8px_8px_42%_8px]" label="Community-led change" /></div><div className="space-y-14"><div><p className="eyebrow text-[#c9795b]">Mission</p><h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl" data-testid="text-mission">Creating an environment that enables every child to live a dignified life—free from violence, poverty, and exclusion.</h2></div><div className="border-t border-[#cfcbbf] pt-10"><p className="eyebrow text-[#c9795b]">Vision</p><p className="mt-5 max-w-2xl font-display text-3xl leading-tight" data-testid="text-vision">A society where children are safe and supported to grow to their full potential, no matter where they come from.</p></div></div></div></section><section className="bg-[#536b57] px-5 py-20 text-[#f4f0e8] md:py-28"><div className="section-wrap"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><Eyebrow>What guides us</Eyebrow><h2 className="mt-5 font-display text-5xl md:text-6xl">Values in practice.</h2></div><p className="max-w-sm text-sm leading-6 text-[#cfcbbf]">Values only matter when they show up in how we listen, decide, and share responsibility.</p></div><div className="mt-14 grid border-t border-[#cfcbbf]/40 md:grid-cols-3">{values.map(([number, title, body]) => <article key={title} className="border-b border-[#cfcbbf]/40 py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0" data-testid={`value-card-${number}`}><span className="font-mono-ui text-xs text-[#f2e782]">{number}</span><h3 className="mt-12 font-display text-3xl">{title}</h3><p className="mt-4 leading-7 text-[#cfcbbf]">{body}</p></article>)}</div></div></section><section className="px-5 py-20 md:py-28"><div className="section-wrap flex flex-col items-start gap-8 border-l-4 border-[#f2e782] pl-7 md:flex-row md:items-center md:justify-between md:pl-10"><p className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">No child should have to earn the right to be safe.</p><Link href="/work" className="inline-flex shrink-0 items-center rounded-full bg-[#151817] px-6 py-3.5 font-bold text-[#f4f0e8]" data-testid="link-about-work">See our approach <ArrowRight className="ml-2 h-4 w-4" /></Link></div></section></>;
}

function Work() {
  return <><Seo title="Our work" description="Explore Right Path Initiative's programme areas: Child Rights, Livelihood, Early Education, WASH, Gender Equality, and Menstrual Health." /><PageIntro eyebrow="Our work" title="Change takes more than one path." intro="Our programme areas connect the everyday conditions that help children feel safe, supported, and able to imagine a future." /><section className="px-5 py-20 md:py-28"><div className="section-wrap"><div className="grid gap-4 border-t border-[#cfcbbf] md:grid-cols-2">{programAreas.map((area, index) => <article key={area.name} className={`hover-lift border-b border-[#cfcbbf] p-7 md:p-10 ${area.tone === 'yellow' ? 'bg-[#f2e782]' : area.tone === 'terracotta' ? 'bg-[#c9795b] text-[#f4f0e8]' : area.tone === 'green' ? 'bg-[#536b57] text-[#f4f0e8]' : 'bg-[#cfcbbf]'}`} data-testid={`program-card-${index}`}><div className="flex items-start justify-between gap-6"><span className="font-mono-ui text-xs opacity-70">0{index + 1}</span><ArrowDownRight className="h-6 w-6 -rotate-45" /></div><h2 className="mt-20 font-display text-4xl leading-tight">{area.name}</h2><p className="mt-4 max-w-sm leading-7 opacity-80">{area.note}</p><p className="mt-10 border-t border-current/25 pt-4 font-mono-ui text-[.63rem] uppercase tracking-[.13em] opacity-65">Approved programme detail placeholder</p></article>)}</div></div></section><section className="bg-[#151817] px-5 py-20 text-[#f4f0e8] md:py-28"><div className="section-wrap grid gap-12 md:grid-cols-[.7fr_1.3fr]"><div><Eyebrow>How we work</Eyebrow><h2 className="mt-6 font-display text-5xl leading-tight text-[#f2e782]">With, not for.</h2></div><div className="grid gap-8 md:grid-cols-2"><div className="border-t border-[#536b57] pt-6"><Sparkles className="h-5 w-5 text-[#c9795b]" /><h3 className="mt-5 font-display text-2xl">Community-led</h3><p className="mt-3 text-sm leading-6 text-[#cfcbbf]">Approved approach and partnership detail placeholder.</p></div><div className="border-t border-[#536b57] pt-6"><ShieldCheck className="h-5 w-5 text-[#f2e782]" /><h3 className="mt-5 font-display text-2xl">Safeguarding-minded</h3><p className="mt-3 text-sm leading-6 text-[#cfcbbf]">Approved safeguarding commitments placeholder.</p></div></div></div></section></>;
}

function Impact() {
  return <><Seo title="Impact" description="Approved impact figures from Right Path Initiative." /><PageIntro eyebrow="Impact" title="Numbers with people behind them." intro="These approved figures offer a snapshot of the children, caregivers, individuals, and families reached through our work." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-x-12 gap-y-0 md:grid-cols-2">{impactFigures.map(([figure, label], index) => <div className="group flex gap-6 border-b border-[#cfcbbf] py-8" key={label} data-testid={`impact-figure-${index}`}><span className="font-mono-ui text-xs text-[#c9795b]">0{index + 1}</span><div><p className="font-display text-5xl leading-none md:text-6xl">{figure}</p><p className="mt-3 max-w-xs text-sm leading-6 text-[#536b57]">{label}</p></div></div>)}</div></section><section className="bg-[#f2e782] px-5 py-20 md:py-24"><div className="section-wrap grid gap-8 md:grid-cols-[.7fr_1.3fr]"><Eyebrow>Reading the numbers</Eyebrow><div><p className="font-display text-4xl leading-tight md:text-5xl">Every figure is a doorway into a longer story of care, courage, and community.</p><p className="mt-6 max-w-xl leading-7 text-[#536b57]" data-testid="text-impact-note">Additional methodology, reporting period, and verification notes — placeholder pending approval.</p></div></div></section><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-8 md:grid-cols-[1fr_1fr] md:items-center"><MediaPlaceholder className="h-[330px] rounded-[40%_6px_6px_6px]" label="Impact in context" /><div><Eyebrow>More to come</Eyebrow><h2 className="mt-6 font-display text-4xl leading-tight">We are building a fuller picture.</h2><p className="mt-5 leading-7 text-[#536b57]">Approved case studies, reporting notes, and community voices will live here as they are ready to share.</p><Link href="/stories" className="mt-7 inline-flex items-center font-bold text-[#c9795b]" data-testid="link-impact-stories">Read stories <ArrowRight className="ml-2 h-4 w-4" /></Link></div></div></section></>;
}

const storyCards = [
  ['Listening changes what becomes possible.', 'A community story about making space for children’s voices.', 'Child Rights'],
  ['Keeping girls in the classroom.', 'A story about dignity, confidence, and menstrual health.', 'Menstrual Health'],
  ['Stability is built together.', 'A family story about pathways toward financial stability.', 'Livelihood'],
];

function Stories() {
  const [openStory, setOpenStory] = useState<number | null>(null);
  return <><Seo title="Stories" description="Stories of community, dignity, and possibility from Right Path Initiative." /><PageIntro eyebrow="Stories" title="The work is human." intro="Stories help us remember that progress is not abstract. It has a name, a voice, a family, a next step." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-16">{storyCards.map(([title, description, category], index) => <article key={title} className={`grid gap-8 md:grid-cols-[.7fr_1.3fr] md:items-center ${index % 2 ? 'md:ml-20' : ''}`} data-testid={`story-card-${index}`}><MediaPlaceholder className={`h-[270px] ${index === 1 ? 'rounded-[6px_6px_38%_6px]' : 'rounded-[6px_35%_6px_6px]'}`} label={`${category} story`} /><div><p className="eyebrow text-[#c9795b]">{category} / story placeholder</p><h2 className="mt-5 max-w-xl font-display text-4xl leading-tight md:text-5xl">{title}</h2><p className="mt-5 max-w-lg leading-7 text-[#536b57]">{description}</p><button type="button" className="mt-7 inline-flex items-center border-b border-[#151817] pb-1 font-bold" aria-expanded={openStory === index} onClick={() => setOpenStory(openStory === index ? null : index)} data-testid={`button-story-${index}`}>{openStory === index ? 'Close preview' : 'Story preview'} {openStory === index ? <ChevronUp className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}</button>{openStory === index && <p className="mt-5 max-w-lg border-l-2 border-[#f2e782] pl-4 text-sm leading-6 text-[#536b57]" data-testid={`text-story-preview-${index}`}>Approved story text and consent-cleared community voice placeholder. This preview will be replaced with the full story when approved for publication.</p>}</div></article>)}</div></section><section className="bg-[#536b57] px-5 py-20 text-[#f4f0e8]"><div className="section-wrap grid gap-8 md:grid-cols-[.7fr_1.3fr]"><Quote className="h-10 w-10 text-[#f2e782]" /><div><p className="font-display text-4xl leading-tight md:text-5xl" data-testid="text-story-note">Stories shared here will always centre consent, context, and the dignity of the people involved.</p><p className="mt-6 font-mono-ui text-xs uppercase tracking-[.14em] text-[#cfcbbf]">Our publishing commitment</p></div></div></section></>;
}

function GetInvolved() {
  const ways = [['Give', 'A one-time or monthly gift can help sustain practical, community-led work.', '/donate', 'Explore giving'], ['Share your skills', 'Volunteer and partnership details — placeholder pending confirmation.', '/contact', 'Start a conversation'], ['Stay close', 'Receive occasional updates about the work and the people shaping it.', '#newsletter', 'Join the circle']];
  const [joined, setJoined] = useState(false);
  const handleJoin = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setJoined(true); };
  return <><Seo title="Get involved" description="Find a meaningful way to support Right Path Initiative." /><PageIntro eyebrow="Get involved" title="There is a place for your care here." intro="Whether you give, share a skill, or help carry these stories forward, your part can strengthen a safer future for children." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-4 md:grid-cols-3">{ways.map(([title, body, href, action], index) => <article key={title} className={`flex min-h-[350px] flex-col p-8 ${index === 0 ? 'bg-[#c9795b] text-[#f4f0e8]' : index === 1 ? 'bg-[#f2e782]' : 'bg-[#536b57] text-[#f4f0e8]'}`} data-testid={`involvement-card-${index}`}><span className="font-mono-ui text-xs opacity-70">0{index + 1}</span><h2 className="mt-auto font-display text-4xl">{title}</h2><p className="mt-4 leading-7 opacity-80">{body}</p>{href.startsWith('#') ? <button type="button" onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })} className="mt-7 inline-flex w-fit items-center border-b border-current pb-1 font-bold" data-testid="button-scroll-newsletter">{action}<ArrowRight className="ml-2 h-4 w-4" /></button> : <Link href={href} className="mt-7 inline-flex w-fit items-center border-b border-current pb-1 font-bold" data-testid={`link-involvement-${index}`}>{action}<ArrowRight className="ml-2 h-4 w-4" /></Link>}</article>)}</div></section><section id="newsletter" className="bg-[#151817] px-5 py-20 text-[#f4f0e8] md:py-28"><div className="section-wrap grid gap-10 md:grid-cols-[.85fr_1.15fr]"><div><Eyebrow>Stay close</Eyebrow><h2 className="mt-6 font-display text-5xl leading-tight text-[#f2e782]">Good work grows in company.</h2><p className="mt-5 max-w-sm leading-7 text-[#cfcbbf]">Join the update list placeholder. We will only send meaningful news, not noise.</p></div>{joined ? <div className="flex min-h-[260px] flex-col justify-center border border-[#536b57] p-8" data-testid="status-newsletter-success"><Check className="h-7 w-7 text-[#f2e782]" /><h3 className="mt-5 font-display text-3xl">You’re on the list.</h3><p className="mt-3 text-[#cfcbbf]">Thank you for helping keep the circle connected. Confirmation details placeholder.</p></div> : <form onSubmit={handleJoin} className="border border-[#536b57] p-7 md:p-9" aria-label="Join updates form"><label htmlFor="updates-email" className="eyebrow text-[#cfcbbf]">Your email</label><input id="updates-email" name="email" type="email" required placeholder="you@example.com" className="mt-4 w-full border-b border-[#cfcbbf] bg-transparent px-0 py-4 text-lg text-[#f4f0e8] placeholder:text-[#536b57] focus:border-[#f2e782] focus:outline-none" data-testid="input-updates-email" /><button type="submit" className="mt-8 inline-flex items-center rounded-full bg-[#f2e782] px-6 py-3.5 font-bold text-[#151817]" data-testid="button-join-updates">Join the circle <ArrowRight className="ml-2 h-4 w-4" /></button></form>}</div></section></>;
}

function Donate() {
  const [frequency, setFrequency] = useState('One-time');
  const [amount, setAmount] = useState('50');
  const [submitted, setSubmitted] = useState(false);
  const amounts = ['25', '50', '100', '250'];
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return <><Seo title="Donate" description="Support Right Path Initiative with a one-time or monthly gift." /><PageIntro eyebrow="Give with purpose" title="Your generosity can make room for a safer childhood." intro="Choose a gift that feels right. This is a frontend donation form; payment provider and processing details are placeholders pending confirmation." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><div><Eyebrow>Your gift, your choice</Eyebrow><h2 className="mt-6 font-display text-4xl leading-tight">A contribution to dignity, safety, and possibility.</h2><div className="mt-10 flex gap-3 text-sm"><button type="button" onClick={() => setFrequency('One-time')} className={`rounded-full border px-4 py-2 ${frequency === 'One-time' ? 'border-[#151817] bg-[#151817] text-[#f4f0e8]' : 'border-[#cfcbbf]'}`} aria-pressed={frequency === 'One-time'} data-testid="button-frequency-one-time">One-time</button><button type="button" onClick={() => setFrequency('Monthly')} className={`rounded-full border px-4 py-2 ${frequency === 'Monthly' ? 'border-[#151817] bg-[#151817] text-[#f4f0e8]' : 'border-[#cfcbbf]'}`} aria-pressed={frequency === 'Monthly'} data-testid="button-frequency-monthly">Monthly</button></div><div className="mt-10 border-l-4 border-[#f2e782] pl-5"><p className="font-mono-ui text-xs uppercase tracking-[.12em] text-[#536b57]">Selected</p><p className="mt-2 font-display text-3xl">{frequency} / ${amount}</p></div></div>{submitted ? <div className="flex min-h-[420px] flex-col justify-center bg-[#536b57] p-8 text-[#f4f0e8] md:p-12" data-testid="status-donation-success"><Check className="h-9 w-9 text-[#f2e782]" /><h2 className="mt-6 font-display text-5xl">Thank you for standing with children.</h2><p className="mt-5 max-w-md leading-7 text-[#cfcbbf]">Your intention to give has been recorded in this demo. Payment provider and next-step details are placeholders pending confirmation.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-8 inline-flex w-fit items-center border-b border-[#f2e782] pb-1 text-[#f2e782]" data-testid="button-donation-again">Make another gift <ArrowRight className="ml-2 h-4 w-4" /></button></div> : <form onSubmit={submit} className="border border-[#cfcbbf] bg-[#f7f4ed] p-7 md:p-10" aria-label="Donation form"><fieldset><legend className="eyebrow text-[#536b57]">Choose an amount</legend><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{amounts.map((value) => <button type="button" key={value} onClick={() => setAmount(value)} className={`py-4 font-display text-2xl ${amount === value ? 'bg-[#f2e782]' : 'border border-[#cfcbbf] hover:border-[#151817]'}`} aria-pressed={amount === value} data-testid={`button-amount-${value}`}>${value}</button>)}</div></fieldset><label htmlFor="custom-amount" className="mt-7 block text-sm font-bold">Or enter another amount</label><div className="mt-2 flex items-center border-b border-[#151817]"><span className="font-display text-2xl">$</span><input id="custom-amount" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="w-full bg-transparent px-2 py-3 text-lg focus:outline-none" data-testid="input-custom-amount" /></div><div className="mt-8 grid gap-5 sm:grid-cols-2"><div><label htmlFor="donor-name" className="text-sm font-bold">Name</label><input id="donor-name" required className="mt-2 w-full border-b border-[#cfcbbf] bg-transparent py-3 focus:border-[#151817] focus:outline-none" data-testid="input-donor-name" /></div><div><label htmlFor="donor-email" className="text-sm font-bold">Email</label><input id="donor-email" required type="email" className="mt-2 w-full border-b border-[#cfcbbf] bg-transparent py-3 focus:border-[#151817] focus:outline-none" data-testid="input-donor-email" /></div></div><button type="submit" className="mt-9 inline-flex items-center rounded-full bg-[#c9795b] px-6 py-3.5 font-bold text-[#f4f0e8] hover:bg-[#151817]" data-testid="button-submit-donation">Continue to giving <ArrowRight className="ml-2 h-4 w-4" /></button><p className="mt-6 flex gap-2 text-xs leading-5 text-[#536b57]"><ShieldCheck className="h-4 w-4 shrink-0" /> Payment provider and security details placeholder — no payment is processed in this demo.</p></form>}</div></section></>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <><Seo title="Contact" description="Contact Right Path Initiative." /><PageIntro eyebrow="Contact" title="Let’s find the right conversation." intro="Questions, collaboration ideas, and thoughtful introductions are welcome. Official contact details are placeholders until confirmed." /><section className="px-5 py-20 md:py-28"><div className="section-wrap grid gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><Eyebrow>Reach out</Eyebrow><div className="mt-9 space-y-7"><div className="flex gap-4"><Mail className="mt-1 h-5 w-5 text-[#c9795b]" /><div><p className="font-bold">Email</p><p className="mt-1 text-sm text-[#536b57]" data-testid="text-email-placeholder">Official email address placeholder</p></div></div><div className="flex gap-4"><Heart className="mt-1 h-5 w-5 text-[#c9795b]" /><div><p className="font-bold">Office</p><p className="mt-1 text-sm text-[#536b57]" data-testid="text-address-placeholder">Official office address and exact location placeholder</p></div></div></div><div className="mt-12 border-t border-[#cfcbbf] pt-6"><p className="font-mono-ui text-[.65rem] uppercase tracking-[.13em] text-[#536b57]">Safeguarding contact</p><p className="mt-2 text-sm leading-6 text-[#536b57]" data-testid="text-safeguarding-placeholder">Official safeguarding contact route placeholder.</p></div></div>{sent ? <div className="flex min-h-[470px] flex-col justify-center bg-[#f2e782] p-8 md:p-12" data-testid="status-contact-success"><Check className="h-9 w-9" /><h2 className="mt-6 font-display text-5xl leading-tight">Message received.</h2><p className="mt-5 max-w-md leading-7 text-[#536b57]">Thank you for reaching out. This demo does not send email; a response pathway will be connected once official contact details are confirmed.</p><button type="button" onClick={() => setSent(false)} className="mt-8 inline-flex w-fit items-center border-b border-[#151817] pb-1 font-bold" data-testid="button-contact-again">Send another message <ArrowRight className="ml-2 h-4 w-4" /></button></div> : <form onSubmit={submit} className="bg-[#151817] p-7 text-[#f4f0e8] md:p-10" aria-label="Contact form"><div className="grid gap-6 sm:grid-cols-2"><div><label htmlFor="contact-name" className="text-sm text-[#cfcbbf]">Your name</label><input id="contact-name" required className="mt-2 w-full border-b border-[#536b57] bg-transparent py-3 focus:border-[#f2e782] focus:outline-none" data-testid="input-contact-name" /></div><div><label htmlFor="contact-email" className="text-sm text-[#cfcbbf]">Your email</label><input id="contact-email" required type="email" className="mt-2 w-full border-b border-[#536b57] bg-transparent py-3 focus:border-[#f2e782] focus:outline-none" data-testid="input-contact-email" /></div></div><div className="mt-7"><label htmlFor="contact-topic" className="text-sm text-[#cfcbbf]">What can we help with?</label><select id="contact-topic" className="mt-2 w-full border-b border-[#536b57] bg-[#151817] py-3 text-[#f4f0e8] focus:border-[#f2e782] focus:outline-none" data-testid="select-contact-topic"><option>General question</option><option>Partnership idea</option><option>Volunteer interest</option><option>Safeguarding</option></select></div><div className="mt-7"><label htmlFor="contact-message" className="text-sm text-[#cfcbbf]">Your message</label><textarea id="contact-message" required rows={5} className="mt-2 w-full resize-y border-b border-[#536b57] bg-transparent py-3 focus:border-[#f2e782] focus:outline-none" data-testid="textarea-contact-message" /></div><button type="submit" className="mt-9 inline-flex items-center rounded-full bg-[#f2e782] px-6 py-3.5 font-bold text-[#151817]" data-testid="button-submit-contact">Send message <ArrowRight className="ml-2 h-4 w-4" /></button></form>}</div></section></>;
}

function NotFound() {
  return <><Seo title="Page not found" description="The page you are looking for could not be found." /><section className="flex min-h-[65vh] items-center px-5 py-20"><div className="section-wrap"><p className="eyebrow text-[#c9795b]">404 / wrong turn</p><h1 className="mt-6 max-w-2xl font-display text-6xl leading-none md:text-8xl">This path isn’t here.</h1><p className="mt-7 max-w-md text-lg leading-7 text-[#536b57]">Let’s get you back to the work.</p><Link href="/" className="mt-8 inline-flex items-center rounded-full bg-[#151817] px-6 py-3.5 font-bold text-[#f4f0e8]" data-testid="link-not-found-home">Return home <ArrowRight className="ml-2 h-4 w-4" /></Link></div></section></>;
}

function Router() {
  return <Layout><ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/work" component={Work} /><Route path="/impact" component={Impact} /><Route path="/stories" component={Stories} /><Route path="/get-involved" component={GetInvolved} /><Route path="/donate" component={Donate} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></ErrorBoundary></Layout>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;