/**
 * The Start-Up Challenge page: every word in one place.
 * ======================================================================
 * NGEN's pitch to high schools for the six-month challenge. Program
 * details (months, milestones, cohort size, the four capstone days) are
 * how the challenge runs. NGEN's own figures come from site.figures and
 * are not repeated here. Earlier drafts carried sample mentors, sample
 * student ventures, named speaker companies and stock-style photo
 * captions; they were removed rather than shown as fact.
 */

export const challenge = {
  name: "NGEN Start-Up Challenge",
  emailSubject: "NGEN Start-Up Challenge",

  hero: {
    title: "Your students build a real company in six\u00a0months.",
    intro:
      "The NGEN Start-Up Challenge takes a high school team from an idea in January to a pitch in New\u00a0York City in June, with an Ivy League student founder as its mentor the whole way.",
    cta: "Bring it to your school",
    photo: {
      src: "/about/events/workshops.jpg",
      alt: "Student founders talking in a small group around a low table at an NGEN workshop",
      caption: "A small-group session at an NGEN workshop.",
      position: "50% 55%",
    },
  },

  school: {
    title: "Made to fit a school year.",
    intro:
      "The challenge runs alongside your curriculum, one milestone a month from January to May, rather than competing with it.",
    points: [
      {
        name: "Twelve students or more",
        body: "Students work in teams, and each school enters a cohort of at least twelve.",
      },
      {
        name: "No new teaching load",
        body: "Coursework is auto-graded and mentors run their own sessions, so your staff supervise rather than prepare and mark.",
      },
      {
        name: "A live teacher\u00a0dashboard",
        body: "Teachers see where every team stands on each milestone, as the work comes in.",
      },
      {
        name: "Evidence for\u00a0applications",
        body: "Students finish with a shipped venture, a pitch deck and a mentor who knows their work, which is what selective universities look for.",
      },
    ],
  },

  months: {
    title: "From an idea in January to a pitch in June.",
    intro:
      "Every milestone ends with something real, and a working operator joins each one live to show how the work is done and take the cohort’s questions.",
    steps: [
      {
        when: "January",
        title: "Ideation",
        body: "Teams find a problem worth solving, interview real users, and narrow a long list of ideas to one they can defend.",
      },
      {
        when: "February",
        title: "Product and brand",
        body: "A first working version, whether a prototype, an app or a service, with the name, logo and identity that explain why it exists.",
      },
      {
        when: "March",
        title: "Marketing",
        body: "Teams pick a channel, run a real campaign and learn to read the analytics that come back.",
      },
      {
        when: "April",
        title: "Sales",
        body: "First customers, first revenue, and the hard conversations that come with asking someone to pay.",
      },
      {
        when: "May",
        title: "Pitch to investors",
        body: "Five months of work become a deck, a set of numbers and a five-minute pitch the team can deliver cold.",
      },
      {
        when: "June",
        title: "Capstone in New\u00a0York City",
        body: "Four days inside the New\u00a0York startup ecosystem, set out below.",
        capstone: true,
      },
      {
        when: "Summer",
        note: "Optional",
        title: "Virtual internship",
        body: "Students can keep working with the same mentor, alongside the NGEN team on real projects, fully online and around their summer.",
      },
    ],
  },

  mentors: {
    title: "Every team is mentored by an Ivy\u00a0League student\u00a0founder.",
    intro:
      "Mentors are current undergraduates at one of the eight Ivy League universities, founders themselves, matched to what a team is building. They meet their team on a recurring call, review each milestone before it is submitted, and stay with the same students for all six months.",
    schools: ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
    schoolsNote:
      "The universities our mentors attend. NGEN is an independent nonprofit, not affiliated with them.",
    points: [
      {
        name: "A founder who has done it",
        body: "Each mentor built something real in high school, and tells the team plainly what is working and what is not.",
      },
      {
        name: "Inside Ivy League admissions",
        body: "How an application is read, what a standout activity looks like, how to write about a venture and how interviews go.",
      },
      {
        name: "The venture, on the application",
        body: "The company becomes the centerpiece of a student’s application, framed honestly rather than padded.",
      },
      {
        name: "A contact who knows their work",
        body: "Six months on a recurring call builds a real relationship that outlasts the program.",
      },
    ],
  },

  capstone: {
    title: "Four days inside New\u00a0York’s startup\u00a0ecosystem.",
    intro:
      "In June, each school’s top four to six students travel to New\u00a0York for the capstone: investors’ offices, startup offices, a live workshop with their mentors and, on the last day, a pitch on stage.",
    photo: {
      src: "/about/events/Copy of DSC06488.jpg",
      alt: "Three panelists in conversation on stage at NGEN’s conference in New York, a speaker’s portrait on the screen behind them",
      caption: "A panel at NGEN’s conference in New\u00a0York.",
      position: "50% 50%",
    },
    itinerary: {
      label: "Capstone itinerary",
      place: "June, New\u00a0York City",
      days: [
        {
          title: "Founder Trek",
          body: "Back-to-back visits to venture capital offices beside Ivy League student founders who are raising, meeting investors in their own conference rooms.",
        },
        {
          title: "Startup Trek",
          body: "New\u00a0York startup offices, and time with the operators who run them, to see how a product team works day to day.",
        },
        {
          title: "Idea Studio",
          body: "A live workshop where mentors pressure-test every team’s product and pitch before the final day.",
        },
        {
          title: "Pitch Competition",
          body: "Each team pitches on stage to investors and student founders, and the winning teams are\u00a0announced.",
        },
      ],
      note: "Travel and accommodation are budgeted separately.",
    },
  },

  ngen: {
    title: "Run by NGEN, a nonprofit founded by student leaders.",
    body: "NGEN is a 501(c)(3) that connects the next generation of founders across the Ivy League, and runs the conferences, treks and pitch competitions this challenge opens to your students.",
    more: { label: "About NGEN", href: "/about" },
  },

  recognition: {
    title: "Recognition",
    intro: "For the team and programming behind the challenge, in four countries.",
    awards: [
      { name: "Social Entrepreneur of the Year", place: "Singapore", year: "2024" },
      { name: "Best Entrepreneurship Education Project", place: "Singapore", year: "2023" },
      { name: "Commonwealth Youth Awards, Asia finalist", place: "United Kingdom", year: "2023" },
      { name: "President’s Innovation Challenge, semifinalist", place: "United States", year: "2022 and 2023" },
      { name: "Prestige’s 40 Under 40", place: "Malaysia", year: "2022 and 2023" },
      { name: "The Diana Award for Young Changemakers", place: "United Kingdom", year: "2019" },
      { name: "TEDx and TEDxYouth", place: "Malaysia", year: "2018 and 2019" },
    ],
  },

  close: {
    title: "Run the challenge at your school.",
    body: "Tell us about your students and we’ll put together a plan covering curriculum, mentor matching and the New\u00a0York capstone. Cohorts start every January; confirming a term ahead lets us match mentors before the first milestone.",
    cta: "Start a conversation",
    or: "or write to",
  },
};
