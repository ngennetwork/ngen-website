import { universities } from "@/data/universities";
import { getTotalCapitalRaised } from "@/content/startups";
import { Button, Card, LogoGrid, SectionHeader } from "@/components/ui";

// Every section header matches the hero title's treatment: extrabold,
// sentence case, tight leading. No uppercase, no letterspacing, no eyebrow.
const SECTION_TITLE = "font-sans text-h2 font-extrabold leading-tight text-surface-dark";
const SECTION_TITLE_ON_DARK = "font-sans text-h2 font-extrabold leading-tight text-on-dark";

// Same rounding convention as HeroMetrics.jsx (homepage hero strip).
function formatCapital(usd) {
  if (usd >= 1_000_000) return `$${Math.round(usd / 1_000_000)}M+`;
  if (usd >= 1_000) return `$${Math.round(usd / 1_000)}K+`;
  return `$${usd}`;
}

export const metadata = {
  title: "6-Month Start-Up Challenge",
  description:
    "A 6-month start-up challenge for high schoolers to build real world business skills. Five monthly milestones, Ivy League mentorship, an NYC capstone week, and an optional virtual summer internship add-on.",
};

/**
 * Sample photography, standing in for the partnership deck's images until
 * final assets land. Every path below points at an existing file in
 * /public, so swapping in the real photo is a one line change here.
 */
const PHOTOS = {
  hero: "/home/hero-ngen-new-group.jpg",
  heroSecondary: "/about/events/Copy of DSC06515.jpg",
  build: "/about/events/workshops.jpg",
  trek: "/about/events/founder-treks.jpg",
  trailblazers: "/about/events/A78A2298.JPG",
  days: {
    "Founder Trek": "/about/events/founder-treks.jpg",
    "Startup Trek": "/about/events/Copy of DSC06467.jpg",
    "Idea Studio": "/about/events/workshops.jpg",
    "Trailblazers Conference": "/about/events/A78A2298.JPG",
  },
  gallery: [
    { src: "/about/events/Copy of DSC06459-Enhanced-NR.jpg", caption: "Investor keynote and panel" },
    { src: "/home/hero-ngen-group.jpg", caption: "Founders from across the network" },
    { src: "/about/events/A78A2335.JPG", caption: "Live pitch competition" },
    { src: "/about/events/Copy of DSC06558.jpg", caption: "Founder networking between sessions" },
  ],
  ventures: {
    "Desk Helper Robot": "/about/events/conferences.jpg",
    "Consumer Habit App": "/about/events/pitch-competitions.jpg",
    "Science Podcast Network": "/about/events/Copy of DSC06467.jpg",
    "Fragrance Line": "/about/events/Copy of DSC06488.jpg",
    "Jewelry Brand": "/about/events/Copy of DSC06558.jpg",
    "Dance Studio Platform": "/about/events/A78A2335.JPG",
  },
};

const HERO_POINTS = [
  "Build and ship a real product with real customers, not a slide deck for a grade",
  "Get mentored by an Ivy League student founder for all six months",
  "Learn how Ivy League admissions really work from someone who just came through it",
  "Learn each month from operators at Google, HP, Slack, LinkedIn, and The Motley Fool",
  "Optionally continue over the summer with a virtual internship alongside your mentor and the NGEN team",
];

const HIGHLIGHTS = [
  {
    value: "6",
    label: "Months, 0 to Launch",
    body: "One milestone a month from idea and prototype to brand, marketing, sales, and pitch.",
  },
  {
    value: "Optional",
    label: "Summer Internship",
    body: "A virtual add-on where students keep working directly with their Ivy League mentor and the NGEN team after the program ends.",
  },
  {
    value: "4 Days",
    label: "In New York City",
    body: "VC offices, startup offices, a live idea studio, and the Trailblazers Conference stage.",
  },
  {
    value: formatCapital(getTotalCapitalRaised()),
    label: "Founder-Raised Capital",
  },
  {
    value: "8",
    label: "Ivies, and Only Ivies",
    body: "Every mentor is a current undergraduate founder at one of the eight Ivy League universities.",
  },
];

const AWARDS = [
  "The Diana Award for Young Changemakers (UK, 2019)",
  "Social Entrepreneur of the Year (Singapore, 2024)",
  "President's Innovation Challenge Semifinalist (USA, 2022 & 2023)",
  "TEDx & TEDxYouth (Malaysia, 2018 & 2019)",
  "Prestige's 40 Under 40 (Malaysia, 2022 & 2023)",
  "Asia Finalist for Commonwealth Youth Awards (UK, 2023)",
  "Best Entrepreneurship Education Project (Singapore, 2023)",
];

const AT_A_GLANCE = [
  {
    value: "501(c)(3)",
    label: "Nonprofit Organization",
    note: "Every dollar of tuition goes back into curriculum, mentorship, and student support.",
  },
  {
    value: "10",
    label: "Member Schools and Growing",
    note: "Partner schools across three continents run the challenge on the same calendar.",
  },
  {
    value: "20,000+",
    label: "Student Founders Served",
    note: "Students who have come through NGEN programming, workshops, and conferences.",
  },
  {
    value: formatCapital(getTotalCapitalRaised()),
    label: "Founder-Raised Capital",
    note: "Raised by NGEN founders' own startups across the network.",
  },
  {
    value: "All 8 Ivies",
    label: "Ivy League Only",
    note: "Every mentor in this program is a current undergraduate at one of the eight Ivy League universities. No exceptions.",
    feature: true,
  },
];

// The three sample mentor profiles from the partnership deck. Replace with
// real mentor bios once a cohort's mentors are confirmed.
const MENTORS = [
  {
    name: "Harvard Mentor",
    body: "Scaled a regional ed-tech initiative to 5,000+ users; guides students on turning technical interests into a distinct, high-impact project.",
  },
  {
    name: "Princeton Mentor",
    body: "Published climate policy research and represented youth at UN summits; specializes in compelling personal storytelling and interview strategy.",
  },
  {
    name: "UPenn Wharton Mentor",
    body: "Launched a venture-backed sustainable consumer brand in high school; helps students showcase entrepreneurial leadership and commercial initiative.",
  },
];

// What the Ivy League mentor relationship actually delivers. The admissions
// strand is a core selling point, not a side benefit.
const MENTORSHIP_PILLARS = [
  {
    title: "A founder who has done it",
    body: "Your mentor is a current Ivy League undergraduate who built something real in high school. They review each milestone before it is submitted and tell your team what is working and what is not.",
  },
  {
    title: "Inside the Ivy League admissions process",
    body: "Mentors walk students through the process they came through themselves: how an application is read, what a standout extracurricular actually looks like, how to write about a venture, and how interviews really go.",
  },
  {
    title: "Positioning the venture on an application",
    body: "The company students build in this program becomes the centerpiece of their application. Mentors help them frame it honestly and compellingly rather than padding a resume with activities.",
  },
  {
    title: "A network that outlasts the program",
    body: "Six months on a recurring call builds a real relationship. Students leave with an Ivy League contact who knows their work, plus 150 more founders met at the June capstone.",
  },
];

// The optional post-program add-on, surfaced right after the capstone
// section since it picks up where the June trip leaves off.
const SUMMER_INTERNSHIP_POINTS = [
  "Fully virtual, so it fits around any student's summer schedule",
  "Keep working directly with the same Ivy League mentor from the program",
  "Collaborate on real projects alongside the NGEN team itself",
  "Turn the momentum from the capstone into deeper, resume-ready startup experience",
];

const BUILD_PHASE = [
  "Five monthly milestones that take a team from idea to investor pitch",
  "Auto-graded coursework so students get feedback the moment they submit",
  "A live teacher dashboard showing exactly where each team stands",
  "Recurring calls with an Ivy League student founder mentoring the team all six months",
];

const TIMELINE = [
  {
    n: "01",
    when: "January",
    title: "Ideation",
    speaker: "Google",
    body: "Teams find a problem worth solving, interview real users, and narrow a long list of ideas down to one they can defend.",
  },
  {
    n: "02",
    when: "February",
    title: "Product Development & Branding",
    speaker: "HP",
    body: "Teams build a first working version, a prototype, an app, or a service, while landing the name, logo, and visual identity that explains why it exists.",
  },
  {
    n: "03",
    when: "March",
    title: "Marketing",
    speaker: "Slack",
    body: "Teams pick a channel, run a real campaign, and learn to read the analytics coming back at them.",
  },
  {
    n: "04",
    when: "April",
    title: "Sales",
    speaker: "LinkedIn",
    body: "First customers, first revenue, and the hard conversations that come with asking someone to pay.",
  },
  {
    n: "05",
    when: "May",
    title: "Pitch to Investors",
    speaker: "The Motley Fool",
    body: "Teams turn five months of work into a deck, a set of numbers, and a five minute pitch they can deliver cold.",
  },
  {
    n: "06",
    when: "June",
    title: "NYC Capstone",
    speaker: null,
    body: "Four days inside the New York startup ecosystem, closing on the Trailblazers pitch competition stage.",
    finale: true,
  },
];

const CAPSTONE_DAYS = [
  {
    day: "Day 1",
    title: "Founder Trek",
    body: "Back to back visits to venture capital offices alongside active Ivy League founders, meeting the investors in their own conference rooms.",
  },
  {
    day: "Day 2",
    title: "Startup Trek",
    body: "A tour of NYC startup offices and time with the operators running them, seeing how a product team actually works day to day.",
  },
  {
    day: "Day 3",
    title: "Idea Studio",
    body: "A live workshop where Ivy League mentors pressure test every team's product and pitch before the competition.",
  },
  {
    day: "Day 4",
    title: "Trailblazers Conference",
    body: "150 Ivy League student founders, investor keynotes, panels, and the live pitch competition where winning teams are announced.",
  },
];

const CAPSTONE_FEATURES = [
  {
    title: "Founder Treks",
    photo: PHOTOS.trek,
    alt: "NGEN founders visiting a venture capital office in New York City",
    body: "NGEN brings together select groups of founders who are actively raising to visit VCs in their offices throughout the day. Your students walk the route beside Ivy League student founders doing the same thing, and instead of a cold email they walk in with a warm introduction.",
    stats: [
      { value: "3", label: "Cities" },
      { value: "1 Day", label: "VC Hop Route" },
    ],
  },
  {
    title: "Trailblazers Conference",
    photo: PHOTOS.trailblazers,
    alt: "Student founders at the NGEN Trailblazers Conference in New York City",
    body: "Our flagship event: a full day in New York bringing together the sharpest student founders from across all eight Ivy League universities. Your students hear from operators and investors who have built and backed category-defining companies, then turn hallway conversations into mentors, collaborators, and first checks.",
    stats: [
      { value: "150", label: "Student Founders" },
      { value: "8", label: "Ivies Represented" },
    ],
  },
];

const STUDENT_VENTURES = [
  {
    category: "Robotics & Hardware",
    name: "Desk Helper Robot",
    body: "A desktop companion robot designed and fabricated from scratch, with a custom enclosure, an embedded display, and an expressive interface that reacts to the person using it.",
  },
  {
    category: "Consumer Software",
    name: "Consumer Habit App",
    body: "A habit tracking app with daily streaks and progress states, shipped to real users and iterated on from the feedback that came back.",
  },
  {
    category: "Digital Media",
    name: "Science Podcast Network",
    body: "A science education series covering topics from CRISPR to medical imaging, produced, edited, and distributed on a real publishing schedule.",
  },
  {
    category: "Consumer Products",
    name: "Fragrance Line",
    body: "A small batch fragrance brand taken from formulation and packaging design through to an online storefront and a working unit economics model.",
  },
  {
    category: "E-Commerce",
    name: "Jewelry Brand",
    body: "A handmade jewelry label sold through both in-person markets and an online store, with inventory, pricing, and margins the founder runs herself.",
  },
  {
    category: "Services & Booking",
    name: "Dance Studio Platform",
    body: "A local dance studio business built around online booking and tiered pricing, filled to a first full term of paying students.",
  },
];

// The short version of FOR_SCHOOLS, surfaced high on the page so a head of
// school sees the logistics before scrolling the whole program.
const FOR_SCHOOLS_SUMMARY = [
  { title: "Fits your timetable", body: "One milestone a month, January to May." },
  { title: "Taught for you", body: "Auto-graded coursework, mentors run their own sessions." },
  { title: "Evidence for applications", body: "A shipped venture, a deck, and a mentor." },
  {
    title: "Ivy League mentors included",
    body: "Every team matched with a current Ivy undergraduate.",
  },
];

const FOR_SCHOOLS = [
  {
    title: "Fits your timetable",
    body: "One milestone a month from January to May means the challenge runs alongside your existing curriculum rather than competing with it.",
  },
  {
    title: "Taught for you",
    body: "Coursework is auto-graded and mentors run their own sessions, so your staff supervise rather than prepare and mark.",
  },
  {
    title: "Evidence for applications",
    body: "Students finish with a shipped venture, a pitch deck, and a mentor relationship, which is exactly what selective universities look for.",
  },
];

// This program is Ivy League only, so its logo wall is the eight Ivies and
// nothing else — deliberately narrower than the sitewide university list.
const IVY_LEAGUE = ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"];
const MENTOR_SCHOOLS = universities.filter((u) => IVY_LEAGUE.includes(u.name));

/**
 * /startup-challenge is the school-partnership page for the 6-month high
 * school Start-Up Challenge (curriculum plus NYC capstone, with an
 * optional virtual summer internship add-on). Route is provisional; not
 * yet linked from the nav or sitemap.
 */
export default function StartupChallengePage() {
  const mentorLogos = MENTOR_SCHOOLS.map((u) => ({
    id: u.name,
    name: u.name,
    logo: u.logo,
    logoWeight: u.logoHeight,
  }));

  return (
    <div className="bg-bg">
      {/* ============================================================
       * Hero — orange-forward, matching the partnership deck's cover
       * ============================================================ */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        {/* Warm gradient wash with an orange bloom behind the headline. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 520px at 8% 0%, rgba(227,94,30,0.16), transparent 62%), linear-gradient(180deg, var(--color-surface-warm) 0%, var(--color-bg) 100%)",
          }}
        />

        <div className="container-page section-y relative">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent-fill px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-white">
                  6 Months
                </span>
                <span className="rounded-full border border-accent-fill/35 bg-accent-fill/10 px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-accent-ink">
                  Real Business Skills
                </span>
                <span className="rounded-full border border-accent-fill/35 bg-accent-fill/10 px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-accent-ink">
                  Capstone in NYC
                </span>
              </div>

              <h1 className="mt-6 font-sans text-4xl font-extrabold leading-[1.05] text-accent-fill sm:text-5xl lg:text-[3.75rem]">
                Build a real company{" "}
                <span className="text-surface-dark">
                  with an Ivy League founder mentoring you, before you even apply to college.
                </span>
              </h1>

              <div className="mt-6 h-1 w-24 rounded-full bg-accent-fill" />

              <p className="measure mt-6 text-body-lg text-text-muted">
                A 6-month start-up challenge for high schoolers who would rather build the thing
                than read about it. You start in January with an idea and finish in June pitching
                investors in New York City.
              </p>

              <ul className="mt-8 flex flex-col gap-3.5">
                {HERO_POINTS.map((point) => (
                  <li key={point} className="flex gap-3 text-body text-surface-dark">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-fill/15 text-caption font-bold text-accent-ink"
                    >
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button variant="primary" size="lg" href="mailto:info@ngennetwork.org">
                  Bring this to your school
                </Button>
                <Button variant="secondary" size="lg" href="#capstone">
                  See the NYC capstone
                </Button>
              </div>
            </div>

            <div className="relative mb-10 lg:mb-0">
              <div className="relative flex flex-col gap-7">
                {/* A warm plate the same size as the photo, nudged down and right
                    so it shows on two edges only. Both photos use one offset. */}
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-accent-fill/25"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                  <img
                    src={PHOTOS.hero}
                    alt="NGEN student founders gathered at the Trailblazers Conference"
                    className="relative aspect-[16/10] w-full rounded-3xl object-cover shadow-lg"
                  />
                </div>
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-2 translate-y-2 rounded-3xl bg-accent-fill/25"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                  <img
                    src={PHOTOS.heroSecondary}
                    alt="Student founders asking questions at an NGEN conference session"
                    className="relative aspect-[16/10] w-full rounded-3xl object-cover shadow-lg"
                  />
                </div>
              </div>

              <div className="absolute bottom-2 left-2 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-surface-dark text-center text-on-dark shadow-2xl ring-4 ring-bg sm:-left-8 sm:bottom-6 sm:h-36 sm:w-36">
                <span className="font-sans text-h3 font-extrabold leading-none text-accent-fill sm:text-h2">
                  100+
                </span>
                <span className="mt-1 px-4 text-caption font-semibold leading-tight sm:mt-1.5">
                  Gen Z-Led Startups
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight strip */}
      <section className="bg-surface-dark">
        <div className="container-page py-14">
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {HIGHLIGHTS.map((item) => (
              <li key={item.label} className="lg:border-l lg:border-on-dark/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <p className="font-sans text-h1 font-extrabold leading-none text-accent-fill">
                  {item.value}
                </p>
                <p className="mt-2.5 font-sans text-body font-bold text-on-dark">{item.label}</p>
                {item.body && <p className="mt-2 text-small leading-relaxed text-on-dark/70">{item.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick overview for schools — the short version of the section below */}
      <section className="container-page section-y">
        <div className="rounded-3xl border border-neutral-200 bg-surface-card p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-12">
            <div>
              <h2 className={SECTION_TITLE}>How it works for your school</h2>
              <p className="mt-4 text-body leading-relaxed text-text-muted">
                The challenge drops into a school year without adding a teaching load. The full
                breakdown is further down the page.
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {FOR_SCHOOLS_SUMMARY.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-fill/15 text-caption font-bold text-accent-ink"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="font-sans text-body font-bold text-surface-dark">{item.title}</p>
                    <p className="mt-0.5 text-small text-text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* NGEN at a glance */}
      <section className="container-page pb-section">
        <SectionHeader
          title="NGEN at a Glance"
          titleClassName={SECTION_TITLE}
          subtext="NGEN is a nonprofit student entrepreneurship network. We run the conferences, treks, and pitch competitions that this challenge plugs your students into, which is why a cohort of twelve high schoolers ends the year in the same room as founders from every Ivy."
          align="center"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {AT_A_GLANCE.map((stat) =>
            stat.feature ? (
              // The Ivy League tile carries the program's whole positioning,
              // so it gets the navy treatment instead of a plain stat card.
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-xl bg-surface-dark p-8 text-center shadow-lg ring-2 ring-accent-fill transition-all hover:-translate-y-1 hover:shadow-xl sm:col-span-2 lg:col-span-1"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(320px 180px at 50% 0%, rgba(227,94,30,0.35), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="font-sans text-h1 font-extrabold leading-none text-accent-fill">
                    {stat.value}
                  </div>
                  <div className="mt-3 inline-block rounded-full bg-accent-fill px-3 py-1 text-caption font-bold uppercase tracking-wide text-white">
                    {stat.label}
                  </div>
                  <p className="mt-4 text-small leading-relaxed text-on-dark/80">{stat.note}</p>
                </div>
              </div>
            ) : (
              <Card key={stat.label} hover className="border-t-4 border-t-accent-fill text-center">
                <div className="font-sans text-h2 font-extrabold text-accent-fill">
                  {stat.value}
                </div>
                <div className="mt-2 font-sans text-body font-bold text-surface-dark">
                  {stat.label}
                </div>
                <p className="mt-3 text-small leading-relaxed text-text-muted">{stat.note}</p>
              </Card>
            )
          )}
        </div>
      </section>

      {/* The Oct to Mar build */}
      <section className="border-y border-neutral-200 bg-neutral-100">
        <div className="container-page section-y">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-4 hidden h-full w-full rounded-3xl bg-accent-fill/15 sm:block"
              />
              {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
              <img
                src={PHOTOS.build}
                alt="Students working together during an NGEN workshop session"
                className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
              />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-accent-fill px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-white">
                  Months 1 to 5 · Jan to May
                </span>
                <span className="text-caption font-semibold uppercase tracking-wide text-text-muted">
                  Min. 12 students
                </span>
              </div>

              <h2 className={`mt-5 ${SECTION_TITLE}`}>
                Six months of building, inside your school year
              </h2>

              <p className="mt-5 text-body-lg text-text-muted">
                Five of the six months run inside the school year, one milestone a month from
                January to May, and every milestone ends with something real: a validated idea, a
                working prototype, a brand, a live campaign, first revenue, and finally a pitch. The
                sixth month is the capstone week in New York.
              </p>

              <ul className="mt-7 flex flex-col gap-3.5">
                {BUILD_PHASE.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-surface-dark">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-fill/15 text-caption font-bold text-accent-ink"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page section-y">
        <SectionHeader
          title="Challenge Timeline With Expert Speakers"
          titleClassName={SECTION_TITLE}
          subtext="Each milestone is taught alongside an operator from a company students already know. They join live, walk through how the work is done inside their own company, and take questions from the cohort."
          align="center"
        />

        {/* An 8-column track with 2-column cards: four across the top row, then
            the remaining three offset half a card so they center under them. */}
        <ol className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-8">
          {TIMELINE.map((step, i) => (
            <li
              key={step.n}
              className={`relative lg:col-span-2 ${i === 4 ? "lg:col-start-2" : ""}`}
            >
              <div
                className={`flex h-full flex-col rounded-2xl border p-6 pt-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                  step.finale
                    ? "border-transparent bg-surface-dark"
                    : "border-neutral-200 bg-surface-card"
                }`}
              >
                <span
                  className={`absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full font-sans text-small font-extrabold shadow-md ring-4 ring-bg ${
                    step.finale ? "bg-surface-dark text-accent-fill" : "bg-accent-fill text-white"
                  }`}
                >
                  {step.n}
                </span>

                <p
                  className={`text-caption font-bold uppercase tracking-wide ${
                    step.finale ? "text-on-dark/60" : "text-text-muted"
                  }`}
                >
                  {step.when}
                </p>
                <h3
                  className={`mt-1.5 font-sans text-h4 font-extrabold ${
                    step.finale ? "text-on-dark" : "text-surface-dark"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3 text-small leading-relaxed ${
                    step.finale ? "text-on-dark/75" : "text-text-muted"
                  }`}
                >
                  {step.body}
                </p>

                {step.speaker && (
                  <p className="mt-auto border-t border-neutral-200 pt-4 text-small text-text-muted">
                    Speaker from{" "}
                    <span className="font-bold text-accent-ink">{step.speaker}</span>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center text-small text-text-muted">
          Travel and accommodation for the NYC capstone are budgeted separately.
        </p>
      </section>

      {/* Mentors */}
      <section className="border-y border-neutral-200 bg-neutral-100">
        <div className="container-page section-y">
          <SectionHeader
            title="Mentored by an Ivy League Student Founder"
            titleClassName={SECTION_TITLE}
            subtext="This is an Ivy League only program. Every high school team is matched with a current undergraduate at one of the eight Ivies who is an active founder, and who sat where your students sit a few years ago. They meet their team on a recurring call, review each milestone before it is submitted, and stay with the same students for all six months."
            align="center"
          />

          <div className="mx-auto mt-14 max-w-5xl">
            <LogoGrid
              items={mentorLogos}
              surface="color"
              columns="grid-cols-2 sm:grid-cols-4"
            />
          </div>

          <p className="measure mx-auto mt-6 text-center text-small text-text-muted">
            The eight universities our student mentors currently attend. NGEN is an independent
            nonprofit and is not affiliated with these institutions.
          </p>

          {/* What the mentorship actually delivers */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {MENTORSHIP_PILLARS.map((pillar) => (
              <Card key={pillar.title} hover className="flex flex-col gap-3 border-l-4 border-l-accent-fill">
                <h3 className="font-sans text-h4 font-extrabold text-surface-dark">
                  {pillar.title}
                </h3>
                <p className="text-body leading-relaxed text-text-muted">{pillar.body}</p>
              </Card>
            ))}
          </div>

          <p className="measure mx-auto mt-16 text-center text-body text-text-muted">
            Mentors are matched to what a team is actually building, not assigned at random. Three
            examples of the profiles in our current corps:
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {MENTORS.map((mentor) => (
              <Card key={mentor.name} hover className="flex flex-col gap-3">
                <h3 className="font-sans text-h4 font-extrabold text-surface-dark">
                  {mentor.name}{" "}
                  <span className="font-semibold text-text-muted">(Example)</span>
                </h3>
                <p className="text-body leading-relaxed text-text-muted">{mentor.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
       * Capstone week — the centerpiece section
       * ============================================================ */}
      <section id="capstone" className="scroll-mt-20 bg-surface-dark">
        <div className="container-page section-y-lg">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-accent-fill px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-white">
              June · New York City
            </span>
            <h2 className={`mt-6 ${SECTION_TITLE_ON_DARK}`}>
              Four days inside the New York startup ecosystem
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-on-dark/75">
              Your top four to six students fly to New York for the capstone week. They spend it in
              venture capital offices, in startup offices, in a live workshop with their mentors,
              and finally on the Trailblazers stage delivering their pitch.
            </p>
          </div>

          {/* Day by day */}
          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAPSTONE_DAYS.map((item) => (
              <li
                key={item.day}
                className="group flex flex-col overflow-hidden rounded-2xl bg-surface-dark-raised/40 ring-1 ring-on-dark/10 transition-all hover:-translate-y-1 hover:ring-accent-fill/50"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                  <img
                    src={PHOTOS.days[item.title]}
                    alt={`${item.title} during the NGEN NYC capstone week`}
                    className="aspect-[16/10] w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-accent-fill px-3 py-1 text-caption font-bold uppercase tracking-wide text-white">
                    {item.day}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-6">
                  <h3 className="font-sans text-h4 font-extrabold text-on-dark">{item.title}</h3>
                  <p className="text-small leading-relaxed text-on-dark/70">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* The two flagship programs */}
          <div className="mt-20 grid gap-8 lg:grid-cols-2">
            {CAPSTONE_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col overflow-hidden rounded-3xl bg-surface-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                <img
                  src={feature.photo}
                  alt={feature.alt}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-sans text-h3 font-extrabold text-surface-dark">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-body leading-relaxed text-text-muted">{feature.body}</p>

                  {/* Fixed two-column track so both cards' stats line up with
                      each other across the pair. */}
                  <div className="mt-auto grid grid-cols-2 gap-6 pt-8">
                    {feature.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-sans text-h3 font-extrabold text-accent-fill">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-caption font-semibold uppercase tracking-wide text-text-muted">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="mt-20">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PHOTOS.gallery.map((photo) => (
                <figure key={photo.src} className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="aspect-[4/3] w-full rounded-2xl object-cover opacity-85 transition-opacity group-hover:opacity-100"
                  />
                  <figcaption className="mt-3 text-small text-on-dark/65">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Optional post-program add-on — sits right after the capstone since
          it picks up where the June trip leaves off. */}
      <section className="container-page section-y">
        <div className="rounded-3xl border border-neutral-200 bg-surface-card p-8 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-12">
            <div>
              <span className="inline-block rounded-full bg-accent-fill/10 px-3.5 py-1.5 text-caption font-bold uppercase tracking-wide text-accent-ink">
                Optional Add-On
              </span>
              <h2 className={`mt-4 ${SECTION_TITLE}`}>
                Keep going with a virtual summer internship
              </h2>
              <p className="mt-4 text-body leading-relaxed text-text-muted">
                After the June capstone, students can opt into a virtual summer internship, an
                enriching add-on that keeps them working directly with their Ivy League mentor and
                the NGEN team.
              </p>
            </div>

            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {SUMMER_INTERNSHIP_POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-fill/15 text-caption font-bold text-accent-ink"
                  >
                    ✓
                  </span>
                  <p className="text-small text-text-muted">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Student ventures */}
      <section className="container-page section-y">
        <SectionHeader
          title="Ventures Built by High Schoolers"
          titleClassName={SECTION_TITLE}
          subtext="Every team starts from a blank page and creates a brand new venture, then ships it to real users. The six below were designed, named, built, and sold by high school students during a single 6-month cohort, spanning hardware, consumer apps, digital media, and D2C brands."
          align="center"
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDENT_VENTURES.map((venture) => (
            <li key={venture.name}>
              <Card
                hover
                padded={false}
                className="flex h-full flex-col overflow-hidden border-t-4 border-t-accent-fill"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- sample photo, swapped for the final asset later */}
                  <img
                    src={PHOTOS.ventures[venture.name]}
                    alt={`${venture.name}, a venture built by an NGEN student founder`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-surface-dark/90 px-3 py-1 text-caption font-bold uppercase tracking-wide text-on-dark backdrop-blur-sm">
                    {venture.category}
                  </span>
                  <span className="absolute bottom-4 left-4 rounded-full bg-accent-fill px-3 py-1 text-caption font-bold uppercase tracking-wide text-white">
                    High School Venture
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-7">
                  <h3 className="font-sans text-h4 font-extrabold text-surface-dark">
                    {venture.name}
                  </h3>
                  <p className="text-small leading-relaxed text-text-muted">{venture.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Why schools run it */}
      <section className="border-y border-neutral-200 bg-neutral-100">
        <div className="container-page section-y">
          <SectionHeader
            title="What This Looks Like for Your School"
            titleClassName={SECTION_TITLE}
            subtext="The challenge is designed to drop into a school year without adding a teaching load."
            align="center"
          />
          {/* Three cards on a three-column track, held to a narrower measure so
              the row sits centered on the page rather than orphaning a card. */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {FOR_SCHOOLS.map((item) => (
              <Card key={item.title} hover className="flex flex-col gap-3">
                <h3 className="font-sans text-h4 font-extrabold text-surface-dark">{item.title}</h3>
                <p className="text-small leading-relaxed text-text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="container-page section-y">
        <SectionHeader
          title="Recognition"
          titleClassName={SECTION_TITLE}
          subtext="Our team and programming have been recognized by awards and institutions across four countries."
          align="center"
        />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {AWARDS.map((award) => (
            <li
              key={award}
              className="rounded-full border border-neutral-200 bg-surface-card px-4 py-2 text-small text-text-muted"
            >
              {award}
            </li>
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-surface-dark px-8 py-16 text-center text-on-dark sm:px-14">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(700px 320px at 50% 0%, rgba(227,94,30,0.30), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className={SECTION_TITLE_ON_DARK}>Run the Start-Up Challenge at your school.</h2>
            <p className="measure mx-auto mt-5 text-body-lg leading-relaxed text-on-dark/80">
              Tell us about your cohort and we will put together a partnership plan covering
              curriculum, mentor matching, and the NYC capstone. Cohorts start every January, and we
              recommend confirming a term ahead so mentor matching is done before the first
              milestone.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg" href="mailto:info@ngennetwork.org">
                Start a conversation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
