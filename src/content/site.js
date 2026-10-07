/**
 * Site copy: the single source of truth for words.
 * ======================================================================
 * Every headline, label and line of copy on the site lives here, so a
 * wording change is one edit. Program and startup records live next door
 * (programs.js, startups.js); people and logos in src/data.
 *
 * Facts: figures come from NGEN's own bio (October 2026). Don't add a
 * figure without a source, and don't repeat one across sections of a page.
 */

/** The flagship NGEN presents. Its own site carries the details. */
export const conference = {
  name: "Ivy League Entrepreneurship Conference",
  // The conference site's own lockup: three lines.
  nameLines: ["Ivy League", "Entrepreneurship", "Conference"],
  // Noon keeps the date right in any time zone; the start time is TBD.
  startsAt: "2027-04-17T12:00:00-04:00",
  dateLabel: "April 17, 2027",
  city: "New York City",
  format: "Invite-only",
  // The conference's fixed motto, verbatim.
  motto: "Connecting world-class student entrepreneurs with today’s most influential leaders.",
  // The conference site's production address. Swap for its custom domain once connected.
  url: "https://ngen-five.vercel.app",
};

export const site = {
  name: "NGEN",
  fullName: "NextGen Entrepreneurship Network",
  tagline: "The Ivy League entrepreneurship network",
  mission: "Connecting the next generation of founders across the Ivy League.",
  description:
    "NGEN connects the next generation of founders across the Ivy League and top universities. Where students meet, build, and raise capital.",
  email: "info@ngennetwork.org",
  ein: "93-2106846",

  links: {
    luma: "https://luma.com/ngen",
    lumaEmbed: "https://luma.com/embed/calendar/cal-WtngTovCXlKVWHM/events?lt=light",
    linkedin: "https://www.linkedin.com/company/ngen-network/",
    instagram: "https://www.instagram.com/ngennetwork/",
    donateZeffy: "https://www.zeffy.com/en-US/donation-form/donate-to-empower-entrepreneurs",
    donateEmbed: "https://www.zeffy.com/embed/donation-form/donate-to-empower-entrepreneurs",
    giftZeffy: "https://www.zeffy.com/en-US/donation-form/power-the-intercollegiate-founder-ecosystem",
  },

  labels: {
    skipToContent: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    newTab: "(opens in a new tab)",
    daysAway: (days) => (days === 1 ? "Tomorrow" : days === 0 ? "Today" : `In ${days} days`),
  },

  nav: {
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Events", href: "/events" },
      { label: "Capital", href: "/capital-network/founders", match: "/capital-network" },
      { label: "Impact", href: "/impact" },
      { label: "About", href: "/about" },
    ],
    cta: { label: "Upcoming events", href: "/events" },
  },

  /** Figures from NGEN's bio. Each appears once per page at most. */
  figures: {
    raised: { value: "$30M+", label: "raised by founders who came through NGEN" },
    reach: { value: "20,000", label: "students reached across the network" },
    universities: { value: "15", label: "universities represented" },
    partners: { value: "$500K+", label: "put into students and programs by NGEN’s VC partners" },
    events: { value: "18", label: "conferences, treks and pitch competitions in three years" },
  },

  footer: {
    columns: { pages: "Pages", involved: "Get involved", follow: "Follow" },
    involved: [
      { label: "Partner with us", href: "/partner" },
      { label: "Donate", href: "/donate" },
      { label: "Contact", href: "/contact" },
    ],
    follow: [
      { label: "Luma", href: "https://luma.com/ngen" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/ngen-network/" },
      { label: "Instagram", href: "https://www.instagram.com/ngennetwork/" },
    ],
    legal:
      "NextGen Entrepreneurship Network (operating as NGEN) is a registered 501(c)(3) tax-exempt organization (EIN: 93-2106846). Contributions are tax-deductible to the extent allowed by law.",
    copyright: "NextGen Entrepreneurship Network",
  },
};

/* ---------------------------------------------------------------------------
   Home
   ------------------------------------------------------------------------ */

export const home = {
  hero: {
    kicker: "The Ivy League entrepreneurship network",
    title: "Where students meet, build, and raise capital.",
    intro:
      "NGEN connects the next generation of founders across the Ivy League and top universities.",
    primary: { label: "Upcoming events", href: "/events" },
    secondary: { label: "Partner with us", href: "/partner" },
  },

  mission: {
    title: "The center of gravity for student\u00a0innovation.",
    body: "NGEN builds the spaces where entrepreneurial students meet in person, find co-founders and test ideas, well before they call themselves founders.",
    line: "Our mission: connecting the next generation of founders across the Ivy League.",
    cta: { label: "Our story", href: "/about" },
  },

  programs: {
    title: "From first idea to funded\u00a0startup.",
    more: { label: "All programs", href: "/programs" },
    capitalPhoto: {
      src: "/about/events/workshops.jpg",
      alt: "Student founders talking in a small group at an NGEN event",
    },
  },

  story: {
    title: "How NGEN began",
    steps: [
      {
        label: "Origin",
        figure: "3",
        title: "Three campus leaders, one group chat",
        body: "Will led entrepreneurship at Brown, Harsha at Wharton and Jackson at Princeton. Students everywhere were building, but school lines kept them apart.",
      },
      {
        label: "The trial run",
        figure: "100+",
        title: "The first conference",
        body: "A trial run in New\u00a0York\u00a0City. Over 100 students from Ivy+ universities came, and the momentum in that room made the next step clear.",
      },
      {
        label: "Three years",
        figure: "18",
        title: "Conferences, treks and pitch competitions",
        body: "NGEN incorporated as a 501(c)(3) so the programs would last, then built the network event by event.",
      },
      {
        label: "Now",
        figure: "2027",
        title: "A bigger stage",
        body: "NGEN’s flagship becomes the Ivy League Entrepreneurship Conference: invite-only, in New\u00a0York\u00a0City on April\u00a017,\u00a02027.",
      },
    ],
    more: { label: "Read the founders’ letter", href: "/about" },
  },

  startups: {
    title: "$30M+ raised by founders who came through NGEN.",
    more: { label: "The full record", href: "/impact" },
  },

  speakers: {
    title: "Past speakers",
    subtitle: "At NGEN’s flagship conference in New\u00a0York",
    more: { label: "All speakers", href: "/programs/ivy-league-entrepreneurship-conference#speakers" },
    previous: "Previous speakers",
    next: "More speakers",
  },

  // From the conference site's sponsors page, Juan's own wording.
  partners: {
    title: "Meet the next generation of founders before anyone else\u00a0does.",
    intro: "Put your brand in front of Ivy League student founders and the investors and operators who show up for them.",
    more: { label: "Partner with us", href: "/partner" },
  },

  calendar: {
    title: "Upcoming events",
    body: "Every NGEN event is on the calendar. Follow it on Luma to hear about new ones, no account needed.",
    follow: "Follow the calendar on Luma",
    card: {
      kicker: "Admit one",
      dateLabel: "Date",
      cityLabel: "Location",
      cta: "The conference site",
    },
  },

  closing: {
    title: "Come to an\u00a0event.",
    body: "NGEN programs are for student founders and builders at partner universities. The next one is on the calendar.",
    primary: { label: "Upcoming events", href: "/events" },
    secondary: { label: "Partner with us", href: "/partner" },
    backers: "Partners, investors and donors make NGEN’s programs possible. Write\u00a0to",
    caption: "Student founders at an NGEN event in New\u00a0York.",
  },
};

/* ---------------------------------------------------------------------------
   Inner pages
   ------------------------------------------------------------------------ */

export const pages = {
  programs: {
    title: "Conferences, treks and pitch competitions.",
    intro:
      "Four programs connect student founders with each other and with the operators and investors who back them, from a first idea to a funded startup.",
    action: { label: "Upcoming events", href: "/events" },
    caption: "A panel at an NGEN conference.",
    listTitle: "Programs",
    capitalTitle: "For founders who are raising",
    applyNote: "Applications open by cycle. Dates are announced on the calendar.",
    more: "About this program",
  },

  program: {
    audienceLabel: "Who it’s for",
    applyLabel: "How to apply",
    applyNote: "Applications open by cycle; new dates go on the calendar first.",
    calendar: { label: "See the calendar", href: "/events" },
    speakersTitle: "Past speakers",
    speakersSubtitle: "At NGEN’s flagship conference in New\u00a0York",
    filmTitle: "On film",
    otherTitle: "Other programs",
    back: { label: "All programs", href: "/programs" },
  },

  events: {
    title: "Come to the next one.",
    intro:
      "Every NGEN event is on the calendar below. Register on Luma, or leave your email to hear when applications open.",
    caption: "Student founders at an NGEN event.",
    calendarTitle: "Calendar",
    calendarCta: "See the calendar",
    calendarNote: "Follow the calendar on Luma",
    applyTitle: "Where to apply",
    applyIntro: "Each program applies through its own portal.",
    alertsTitle: "Hear when applications open",
    alertsBody: "One email when a cycle opens. Nothing else.",
    faqTitle: "How it works",
  },

  capitalFounders: {
    title: "Capital and connections for student\u00a0founders.",
    intro:
      "Get hand-curated warm intros to angels, operators and early capital, from $5K micro-checks and grants to $500K+ rounds. Every submission stays confidential.",
    switchLabel: "For investors",
    switchHref: "/capital-network/investors",
    tiersTitle: "What we match",
    tiers: [
      {
        name: "Micro-grants and prototype",
        range: "Under $10K",
        body: "Grants, hackathons, first prototype capital and campus grant matching. Mostly non-dilutive.",
      },
      {
        name: "Early pre-seed",
        range: "$10K to $50K",
        body: "First angel SAFEs or convertible notes to build your MVP.",
      },
      {
        name: "Seed and beyond",
        range: "$50K to $500K+",
        body: "Priced rounds and lead investor matching for scaling startups.",
      },
    ],
    formTitle: "Submit your startup",
  },

  capitalInvestors: {
    title: "Meet vetted student founders, matched to your\u00a0thesis.",
    intro:
      "The NGEN Capital Network connects accredited angels and VCs with hand-curated student founders across top university ecosystems.",
    switchLabel: "For founders",
    switchHref: "/capital-network/founders",
    howTitle: "How deal flow works",
    howNote:
      "No public pitch database and no cold blasts. The team reviews every submission and sends you curated roundups matched to your check size and sector.",
    steps: [
      { title: "Vetting", body: "Founders submit pitch materials for review by the NGEN team." },
      { title: "Matching", body: "Curated deals are paired with your check size and sector." },
      { title: "Double opt-in intro", body: "A warm email intro, only when both sides confirm interest." },
    ],
    formTitle: "Request deal flow access",
    formIntro: "Join the angels, VC partners and alumni operators supporting student founders.",
    giveTitle: "Support the network\u00a0itself",
    giveBody:
      "NGEN is a 501(c)(3). A tax-deductible gift funds the programs these founders come through.",
    giveCta: "Make a tax-deductible gift",
  },

  impact: {
    title: "The record, three years in.",
    intro:
      "What founders who came through NGEN have built and raised, and where they come from.",
    action: "See every startup",
    figuresTitle: "In figures",
    startupsTitle: "Founders who came\u00a0through",
    startupsIntro: "Largest raise first, each with the press that covered it or, before there is any, the company’s own\u00a0site.",
    universitiesTitle: "Universities represented",
    universitiesIntro: "Student founders across the network come from these 15 schools.",
  },

  about: {
    title: "We kept seeing the same gap.",
    intro: "Connecting the next generation of founders across Ivy+ universities.",
    // The header shows NGEN's own slide; the only founders photo carries the
    // old Trailblazers banner, so it stays off the site until a new one exists.
    caption: "NGEN on stage: building the Ivy+ intercollegiate entrepreneurship ecosystem.",
    // Juan's conference description (October 2026), with the current $30M
    // figure (he confirmed the $20M in the old bio is outdated) and grammar fixed.
    conferenceTitle: "The conference",
    conference: [
      "NGEN, the Ivy League entrepreneurship network, presents the inaugural Ivy League Entrepreneurship Conference. The mission is clear: an invite-only conference that connects world-class student entrepreneurs face to face with today’s most influential leaders.",
      "What began as an intimate New York gathering has been reborn on a larger stage to expand its impact. Its alumni have gone on to earn backing from Y Combinator, a16z, and Techstars, raise over $30M, and lead their startups to acquisition.",
      "Past speakers include Geoff Ralston (President Emeritus, Y Combinator), Tom Gardner (Co-Founder & CEO, The Motley Fool), and Seema Hingorani (Founder, Girls Who Invest).",
    ],
    letterTitle: "The founders’ letter",
    letter: [
      "NGEN’s story began with the three of us meeting in a group chat for student entrepreneurship leaders across top universities. As we led our respective campus ecosystems, with Will leading the Brown Medical Entrepreneurship Society and the Brown Entrepreneurship Program, Harsha leading the Wharton Undergraduate Entrepreneurship Club at UPenn, and Jackson leading the Princeton Entrepreneurship Club, we kept seeing the same gap. Ambitious students were building incredible things, but our communities were isolated by school boundaries, leaving innovative students with no real way to meet peers with complementary skills or shared interests across campuses.",
      "We decided to host a trial run: our first conference, in NYC. We wanted to test if student founders actually cared about collaborating across campus lines. Over 100 students from Ivy+ universities attended, and the momentum in that room made our next step clear.",
      "We incorporated NGEN as a 501(c)(3) nonprofit to create the cross-university ecosystem we wished had existed when we started. A core goal for us is long-term sustainability, ensuring these intercollegiate programs and events endure as permanent infrastructure rather than one-off gatherings or spotty collaborations.",
      "Our focus goes beyond supporting existing student startups. We build spaces for entrepreneurial students to meet through in-person programming, test out new projects, find co-founders, and experiment with ideas well before they even consider themselves a founder. From these gatherings, an entire ecosystem of ongoing support and resources has naturally grown, connecting builders through flagship conferences, investor office visits, pitch competitions, and skillbuilding workshops. We hope you’ll join us and find your place in the NGEN community!",
    ],
    signoff: "Warmly,",
    signature: "Harsha, Jackson & Will",
    roomCaption: "Students at NGEN’s first conference in New\u00a0York.",
  },

  partner: {
    title: "Put your organization in\u00a0front of the next generation of\u00a0founders.",
    intro:
      "NGEN works with corporations, foundations, family offices and tech platforms to power student founders across top university ecosystems.",
    caption: "A fireside chat at an NGEN event.",
    // The conference site's diagram and its three groups, in Juan's words.
    roomTitle: "Talk to the next great founder before they’re too big to\u00a0reach.",
    roomNote: "At the Ivy League Entrepreneurship Conference, three groups meet in one room.",
    roomCenter: "Face to face",
    room: [
      {
        name: "Student founders",
        body: "World-class student entrepreneurs from across the Ivy League, by invitation only.",
        points: ["Face time with the investors and operators they want to learn from", "Join alumni backed by Y\u00a0Combinator, a16z and Techstars"],
      },
      {
        name: "Influential leaders",
        body: "Investors, founders and operators, from the President Emeritus of Y\u00a0Combinator down.",
        points: ["Meet the next generation of founders before they’re too big to reach", "A small, curated room instead of a crowded expo"],
      },
      {
        name: "Sponsors",
        body: "Firms that want to back the next generation early.",
        points: ["Your brand in the room with Ivy League founders", "Founders who came through have raised more than\u00a0$30M"],
      },
    ],
    waysTitle: "Ways to partner",
    waysNote: "Each one opens an email to the team.",
    ways: [
      {
        title: "Conference partner",
        body: "Presence across the flagship event, the Ivy League Entrepreneurship Conference in New\u00a0York\u00a0City.",
      },
      {
        title: "Pitch competition",
        body: "Back the prize and meet the finalists.",
      },
      {
        title: "Foundations and family offices",
        body: "Grant funding for intercollegiate conferences, pitch prize pools and diversity initiatives.",
      },
      {
        title: "Corporations and tech\u00a0platforms",
        body: "API credits, cloud infrastructure, masterclasses and campus recruiting access.",
      },
      {
        title: "Venues and hospitality",
        body: "Hosting founder treks, regional summits and investor dinners.",
      },
    ],
    supportersTitle: "Past supporters",
    supportersNote: "Companies that have supported NGEN events.",
    firmsLabel: "Past speakers and alumni backers from",
    ctaTitle: "Start a conversation",
    ctaBody: "Tell us what you’re looking for, and we’ll put together a partnership that fits.",
  },

  donate: {
    title: "Give students what they need to build.",
    intro:
      "NGEN is a 501(c)(3) nonprofit. Every gift goes directly toward the resources, mentorship and community student founders need.",
    whereTitle: "Where your gift goes",
    where: [
      {
        title: "Travel grants",
        body: "Stipends that make the Ivy League Entrepreneurship Conference reachable for founders who couldn’t otherwise attend.",
      },
      {
        title: "Mentorship and\u00a0programming",
        body: "Connecting student founders with the operators and investors who have done it before.",
      },
      {
        title: "The network itself",
        body: "The day-to-day work that keeps conferences, treks and pitch competitions running.",
      },
    ],
    formTitle: "Make a gift",
    formFallback: "Trouble with the form? Open it on Zeffy",
  },

  contact: {
    title: "Write to the team.",
    intro: "Questions about a program, a partnership, the Capital Network or press all reach the NGEN team.",
    emailCta: "Write an email",
    draft: { label: "New message", to: "To", subject: "Subject", body: "Hello, I’m writing about" },
    topicsTitle: "Or pick a topic, and it reaches the right person",
    topics: [
      { title: "Programs and events", body: "Applying, attending and the calendar.", subject: "NGEN: programs and events" },
      { title: "Capital Network", body: "Founders raising, and investors.", subject: "NGEN: Capital Network" },
      { title: "Partnerships", body: "Sponsoring, hosting and supporting.", subject: "NGEN: partnership" },
      { title: "Press", body: "Media and interview requests.", subject: "NGEN: press" },
    ],
  },
};
