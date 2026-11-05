/**
 * The Start-Up Challenge page: every word in one place.
 * ======================================================================
 * NGEN's pitch to high schools for the six-month challenge. Program
 * details (months, milestones, cohort size, the four capstone days) are
 * how the challenge runs. NGEN's own figures come from site.figures and
 * are not repeated here. Earlier drafts carried sample mentors, sample
 * student ventures, named speaker companies and stock-style photo
 * captions; they were removed rather than shown as fact.
 *
 * The per-student fee and the booking URL live in this object.
 */

export const challenge = {
  name: "NGEN Start-Up Challenge",
  emailSubject: "NGEN Start-Up Challenge",
  applyPath: "/startup-challenge/apply",

  hero: {
    title: "Your students build a real company in six\u00a0months.",
    intro:
      "The NGEN Start-Up Challenge takes a high school team from an idea in January to a pitch in New\u00a0York City in June, with an Ivy League student founder as its mentor the whole way.",
    cta: "Book a 15-minute intro",
    applyCta: "Apply",
    priceLead: "The program fee is",
    priceMid: "per student.",
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
    modesTitle: "Ways a school can run it",
    modes: [
      {
        name: "A class",
        body: "One milestone a month can be the graded work for a subject you already teach.",
      },
      {
        name: "A club",
        body: "An after-school club, with the mentor call as the meeting that stays on the calendar.",
      },
      {
        name: "Independent study",
        body: "A student or a small team, with a teacher supervising rather than building the course.",
      },
      {
        name: "Internship credit",
        body: "Where a school accepts a venture in place of an internship, the six months can stand as that credit.",
      },
    ],
  },

  months: {
    title: "From an idea in January to a pitch in June.",
    intro:
      "Every milestone ends with something real, and a working operator joins each one live to show how the work is done and take the cohort’s questions.",
    skillsTitle: "Business, finance, marketing, and AI",
    skills: [
      {
        name: "Business",
        body: "Choose a customer, a problem, and a reason the venture should exist.",
      },
      {
        name: "Finance",
        body: "Price the offer, record the first dollars, and put real numbers in the pitch.",
      },
      {
        name: "Marketing",
        body: "Pick one channel, run a campaign, and read what came back.",
      },
      {
        name: "AI",
        body: "Use it to research and draft faster, then check every claim before it leaves the team.",
      },
    ],
    steps: [
      {
        when: "January",
        title: "Ideation",
        body: "Teams find a problem worth solving, interview real users, and narrow a long list of ideas to one they can defend. The month is the work of choosing a customer.",
      },
      {
        when: "February",
        title: "Product and brand",
        body: "A first working version, whether a prototype, an app or a service, with the name, logo and identity that explain why it exists. Teams also write down what it costs to deliver once.",
      },
      {
        when: "March",
        title: "Marketing",
        body: "Teams pick a channel, run a real campaign and learn to read the analytics that come back.",
      },
      {
        when: "April",
        title: "Sales",
        body: "First customers, first revenue, and the hard conversations that come with asking someone to pay. What was charged, and what it cost, goes in a simple record.",
      },
      {
        when: "May",
        title: "Pitch to investors",
        body: "Five months of work become a deck, a set of numbers and a five-minute pitch the team can deliver cold. AI can speed the research and the draft; the team is responsible for every claim.",
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
    record:
      "Teachers get a short progress note each month, in the same dashboard. Students who finish the six months receive a certificate of participation naming the venture and the mentor.",
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
          body: "Back-to-back visits to venture capital offices beside Ivy League student founders who are raising. Students meet investors in their own conference rooms and hear what a first meeting actually sounds like.",
        },
        {
          title: "Startup Trek",
          body: "New\u00a0York startup offices, and time with the people who run product, marketing and the numbers, to see how a small team spends a day.",
        },
        {
          title: "Idea Studio",
          body: "A live workshop where mentors pressure-test every team’s product, numbers and pitch, and the five minutes get rewritten in the room before anyone takes the stage.",
        },
        {
          title: "Pitch Competition",
          body: "Each team pitches on stage to investors and student founders, and the winning teams are announced.",
        },
      ],
      note: "Travel and accommodation are budgeted separately.",
    },
  },

  /**
   * Per student. Pay in full, or a deposit on acceptance plus three later
   * payments. Deposit plus the three payments should equal `total`.
   */
  pricing: {
    title: "The fee, per student.",
    intro:
      "The challenge is built for a school cohort of twelve or more. This is what each student pays, so a school can budget the cohort and a student can register on their own.",
    total: 4000,
    per: "per student",
    payInFull: {
      name: "Pay in full",
      amount: 4000,
      detail: "One payment of the full fee.",
    },
    installment: {
      name: "Installment plan",
      deposit: 1000,
      depositLabel: "Deposit",
      depositWhen: "Due on acceptance, to hold the spot.",
      payments: [
        { amount: 1000, when: "January 2027" },
        { amount: 1000, when: "February 2027" },
        { amount: 1000, when: "March 2027" },
      ],
    },
    includedTitle: "Included",
    excludedTitle: "Not included",
    included: [
      "Six milestones, from ideation in January through the pitch in May.",
      "An Ivy League student founder as the team’s mentor, on a recurring call for all six months.",
      "A live workshop with an operator at each milestone.",
      "Practice in business, finance, marketing, and using AI with the claims checked.",
      "Auto-graded coursework and a teacher dashboard.",
      "A monthly progress note, and a certificate of participation for students who finish.",
      "For the school’s top students, the four-day New\u00a0York capstone and a pitch on stage.",
    ],
    excluded: [
      "Travel and accommodation for the June week in New\u00a0York.",
      "The optional summer virtual internship.",
      "Anything a team spends to build or ship its own product.",
    ],
    eligibility: {
      title: "Who it’s for",
      points: [
        "High school students in grades 9–12.",
        "No prior company, and no finished idea, required.",
        "A student may apply alone or with a co-founder. A school cohort is twelve students or more.",
        "January through June, with an optional virtual summer afterward.",
      ],
    },
    cta: "Start an application",
    book: "Book a 15-minute intro",
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

  booking: {
    title: "Fifteen minutes with the NGEN team.",
    intro:
      "A short call for a counselor, a club advisor, or a student deciding whether the January cohort fits. We’ll cover how the six months sit in the school calendar, what registration costs, and what the New\u00a0York week requires.",
    cta: "Book a 15-minute intro",
    url: "https://calendly.com/ngennetwork-info/start-up-challenge-intro-call",
    embed: true,
    iframeTitle: "Book a 15-minute intro with the NGEN team",
    or: "or write to",
    apply: "Student application",
  },

  close: {
    title: "Run the challenge at your school.",
    body: "Tell us about your students and we’ll put together a plan covering curriculum, mentor matching and the New\u00a0York capstone. A student can also apply directly.",
    cta: "Book a 15-minute intro",
    apply: "Student application",
    or: "or write to",
  },

  apply: {
    title: "Apply for the January cohort.",
    intro:
      "For high school students in grades 9–12. Schools still bring a cohort of twelve or more; this form is one student’s place in it. We write back to the email you give us.",
    cta: "Start the application",
    book: "Book a 15-minute intro",
    formTitle: "Your application",
    formIntro:
      "Have a resume ready as a PDF or Word file, 2\u00a0MB or smaller. A parent or guardian should know you are applying.",
    emailInstead: "If the form will not send, write to",
    submit: "Submit application",
    submitting: "Sending\u2026",
    successTitle: "Application received.",
    successBody:
      "Thank you. The NGEN team will write to the email you used. To add a file or another teammate, reply to that note or write to us directly.",
    back: "Back to the challenge",
    fields: {
      name: "Student name",
      email: "Email",
      grade: "Grade",
      gradePlaceholder: "Select a grade",
      dob: "Date of birth (optional)",
      school: "School",
      phone: "Phone (optional)",
      applyingAs: "Are you applying with a co-founder?",
      solo: "On my own",
      team: "With a co-founder",
      teamHint: "A larger team can send the other names by email after this application.",
      cofounderName: "Co-founder name",
      cofounderEmail: "Co-founder email (optional)",
      cofounderSchool: "Co-founder school (optional)",
      motivation: "Why do you want to join?",
      motivationHint: "A short note is enough: what you hope to build, or what you want to learn.",
      resume: "Resume or CV",
      resumeHint: "PDF, DOC, or DOCX. 2\u00a0MB maximum.",
      guardian: "A parent or guardian knows I am applying.",
    },
    errors: {
      summary: "Check the highlighted fields and try again.",
      name: "Enter the student’s name.",
      email: "Enter a valid email address.",
      grade: "Choose a grade from 9 to 12.",
      dob: "Enter a real date of birth, or leave it blank.",
      school: "Enter the school name.",
      phone: "Enter a phone number, or leave it blank.",
      motivation: "Write a short note on why you want to join.",
      applyingAs: "Say whether you are applying on your own or with a co-founder.",
      cofounderName: "Enter your co-founder’s name.",
      cofounderEmail: "Enter a valid email for your co-founder, or leave it blank.",
      cofounderSchool: "That school name is too long.",
      guardian: "A parent or guardian needs to know you are applying.",
      resume: "Attach a resume as a PDF, DOC, or DOCX.",
      resumeEmpty: "That file is empty. Attach a PDF, DOC, or DOCX.",
      resumeSize: "That file is over 2\u00a0MB. Attach a shorter PDF, DOC, or DOCX.",
      resumeType: "That file doesn’t look like a PDF, DOC, or DOCX.",
      unavailable: "Applications aren’t connected yet. Email us and the team will take it from there.",
      unreachable: "We couldn’t reach the application inbox. Email us and we’ll sort it out.",
      generic: "The application didn’t go through. Email us and we’ll sort it out.",
    },
  },
};
