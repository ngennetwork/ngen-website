/**
 * The Start-Up Challenge: every word in one place.
 * Written for parents. The fee, the November 8, 2026 deadline, and the
 * intro link live here. The Calendly widget uses embedUrl. The button
 * uses url (https://www.ngennetwork.org/intro).
 */

export const en = {
  meta: {
    title: "6-Month Start-Up Challenge",
    description:
      "A six-month program for high school students. Parents can book a 15-minute call or apply by November 8, 2026. The fee is US$4,000 per student.",
  },
  switcherLabel: "Language",
  name: "NGEN Start-Up Challenge",
  emailSubject: "NGEN Start-Up Challenge",
  applyPath: "/startup-challenge/apply",
  deadline: "November 8, 2026",

  hero: {
    title: "Help your child build a real company in six\u00a0months.",
    intro:
      "From January to June 2027, your child learns how a company works and builds one. An Ivy League student founder is their mentor. In June, selected students spend four days in New\u00a0York.",
    cta: "Book a 15-minute intro call",
    applyCta: "Apply for your child",
    deadlineLabel: "Book or apply by",
    priceLead: "The fee is",
    priceMid: "per student.",
    photo: {
      src: "/startup-challenge/hero-group.jpg",
      alt: "Students and mentors on stage in front of the orange NGEN logo",
      caption: "The group on stage at an NGEN event.",
      position: "50% 38%",
    },
  },

  glance: {
    title: "At a glance",
    items: [
      {
        icon: "who",
        title: "Who it is for",
        body: "High school students in grades 9 to 12, about 14 to 18 years old. No company or idea is needed.",
      },
      {
        icon: "calendar",
        title: "Dates",
        body: "January to June 2027. Please book a call or apply by November\u00a08, 2026.",
      },
      {
        icon: "laptop",
        title: "Format",
        body: "Online each month from home. Then four days in New\u00a0York in June for selected students.",
      },
      {
        icon: "fee",
        title: "Fee",
        body: "US$4,000 per student. Pay in full, or pay US$1,000 four times. Travel to New\u00a0York is separate.",
      },
    ],
  },

  gets: {
    title: "What your child gets",
    intro: "A clear plan, a real project, and adults who stay with them.",
    photo: {
      src: "/about/events/workshops.jpg",
      alt: "Students talking in a small group at an NGEN workshop",
      caption: "A small-group workshop at an NGEN event.",
      position: "50% 55%",
    },
    items: [
      { icon: "mentor", title: "A mentor for six months", body: "An Ivy League student who has built something of their own. The same mentor stays for the whole program." },
      { icon: "build", title: "A real company project", body: "An idea, a first product, real customers, and a short pitch. Your child finishes with work they can show." },
      { icon: "workshop", title: "Live workshops", body: "Each month an operator joins the group live and answers questions." },
      { icon: "school", title: "A record for school", body: "Teachers can follow progress. Students who finish receive a certificate. Some schools use it as a class, club, or internship credit." },
    ],
  },

  months: {
    title: "The six months",
    intro: "One milestone a month. Each one ends with something finished.",
    photo: {
      src: "/about/events/Copy of DSC06515.jpg",
      alt: "A student speaking into a microphone at an NGEN event in New York",
      caption: "A student asks a question at an NGEN event.",
      position: "50% 40%",
    },
    steps: [
      { when: "January", title: "Choose an idea", body: "Find a real problem and talk to people who have it." },
      { when: "February", title: "Make a first version", body: "Build a simple product and a name people can remember." },
      { when: "March", title: "Tell people about it", body: "Pick one way to reach customers and read the results." },
      { when: "April", title: "Make a first sale", body: "Ask someone to pay, and write down the numbers." },
      { when: "May", title: "Prepare the pitch", body: "Turn the work into a short pitch and clear numbers." },
      { when: "June", title: "New\u00a0York", body: "Selected students spend four days in the city. See the plan below." },
    ],
    note: "Summer with the same mentor is optional, and fully online.",
  },

  mentors: {
    title: "Mentors and people your child will learn from",
    intro:
      "Each mentor is a current student at an Ivy League university and a founder. They meet your child on a regular call and review the work before it is submitted.",
    schools: ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
    schoolsNote: "Where our mentors study. NGEN is an independent nonprofit and is not part of these universities.",
    points: [
      { name: "Honest feedback", body: "The mentor says what is working and what is not." },
      { name: "The same person", body: "One mentor stays for all six months, so your child is not passed around." },
    ],
    speakersTitle: "Speakers at NGEN events in New\u00a0York",
    speakersNote: "These guests have spoken at NGEN. They are not the one-to-one mentors for this program.",
  },

  capstone: {
    title: "Four days in New\u00a0York",
    intro:
      "In June, a school sends its top four to six students. NGEN organizes the days: office visits, a workshop, and a pitch on stage.",
    logisticsTitle: "Travel and supervision",
    logistics: [
      "Travel and hotels are not included in the US$4,000 fee. Families budget them separately.",
      "NGEN sets the schedule and stays with the group for the planned visits and the pitch.",
      "On the intro call we walk through who travels, the daily plan, and how we stay in touch with parents.",
    ],
    photo: {
      src: "/about/events/founder-treks.jpg",
      alt: "Students seated at an NGEN visit, listening to a speaker on stage",
      caption: "Students at an NGEN founder visit in New\u00a0York.",
      position: "50% 45%",
    },
    itinerary: {
      label: "Day by day",
      place: "June 2027, New\u00a0York City",
      days: [
        { title: "Founder visits", body: "Meet investors in their offices, with Ivy League student founders who are raising money." },
        { title: "Startup visits", body: "See how a small team works, and talk with the people who run product and sales." },
        { title: "Practice the pitch", body: "Mentors review the product and the pitch before the last day." },
        { title: "Pitch on stage", body: "Each team presents to investors and student founders." },
      ],
      note: "Travel and accommodation are separate from the program fee.",
    },
  },

  gallery: {
    title: "Past NGEN events",
    intro: "Conferences, workshops, and visits we have run in New\u00a0York.",
    photos: [
      {
        src: "/about/events/conferences.jpg",
        alt: "Three people on a panel at an NGEN conference",
        caption: "A panel at an NGEN conference.",
      },
      {
        src: "/about/events/pitch-competitions.jpg",
        alt: "A speaker presenting to a seated audience at an NGEN event",
        caption: "A talk at an NGEN event.",
      },
      {
        src: "/about/events/A78A2335.JPG",
        alt: "A speaker on stage in front of the NGEN logo",
        caption: "Opening an NGEN program.",
      },
      {
        src: "/about/events/Copy of DSC06488.jpg",
        alt: "Panelists in conversation on stage at an NGEN conference",
        caption: "A conference panel in New\u00a0York.",
      },
      {
        src: "/about/events/Copy of DSC06558.jpg",
        alt: "A panel of founders and investors on stage at an NGEN event",
        caption: "Founders and investors on stage.",
      },
    ],
  },

  pricing: {
    title: "Fee and payment plan",
    intro: "One fee per student for January to June 2027. Please apply by November\u00a08, 2026.",
    total: 4000,
    per: "per student",
    payInFull: {
      name: "Pay in full",
      amount: 4000,
      detail: "One payment of US$4,000.",
    },
    installment: {
      name: "Payment plan",
      deposit: 1000,
      depositLabel: "Deposit",
      depositWhen: "Due when your child is accepted. This holds the place.",
      payments: [
        { amount: 1000, when: "January 2027" },
        { amount: 1000, when: "February 2027" },
        { amount: 1000, when: "March 2027" },
      ],
    },
    includedTitle: "Included",
    excludedTitle: "Not included",
    included: [
      "Six months of milestones, January through May.",
      "An Ivy League student founder as mentor.",
      "A live workshop each month.",
      "Progress notes and a certificate for students who finish.",
      "The four-day New\u00a0York program for selected students.",
    ],
    excluded: [
      "Flights and hotels for New\u00a0York.",
      "The optional online summer.",
      "Costs your child chooses to spend on their own product.",
    ],
    eligibility: {
      title: "Who can join",
      points: [
        "Grades 9 to 12.",
        "No prior company required.",
        "A parent or guardian applies.",
        "Online from January to June 2027, with New\u00a0York in June for selected students.",
      ],
    },
    cta: "Apply for your child",
    book: "Book a 15-minute intro call",
  },

  ngen: {
    title: "Who runs it",
    body: "NGEN is a 501(c)(3) nonprofit started by student leaders. We run conferences, office visits, and pitch events across the Ivy League.",
    more: { label: "About NGEN", href: "/about" },
  },

  recognition: {
    title: "Recognition",
    intro: "Awards for the team behind the program.",
    awards: [
      { name: "Social Entrepreneur of the Year", place: "Singapore", year: "2024" },
      { name: "Best Entrepreneurship Education Project", place: "Singapore", year: "2023" },
      { name: "Commonwealth Youth Awards, Asia finalist", place: "United Kingdom", year: "2023" },
      { name: "President’s Innovation Challenge, semifinalist", place: "United States", year: "2022 and 2023" },
      { name: "The Diana Award for Young Changemakers", place: "United Kingdom", year: "2019" },
    ],
  },

  booking: {
    title: "Talk with us for 15 minutes",
    intro: "A short call for parents. We cover the schedule, the fee, and the New\u00a0York trip. No preparation is needed.",
    cta: "Book a 15-minute intro call",
    url: "https://www.ngennetwork.org/intro",
    embedUrl: "https://calendly.com/ngennetwork-info/start-up-challenge-intro-call",
    embed: true,
    iframeTitle: "Book a 15-minute intro call with NGEN",
    or: "Or email",
    apply: "Apply for your child",
  },

  close: {
    title: "Next step",
    body: "Book a 15-minute call, or send your child’s application, by November\u00a08, 2026. We reply to the parent’s email.",
    cta: "Book a 15-minute intro call",
    apply: "Apply for your child",
    or: "Or email",
  },

  apply: {
    title: "Apply for your child",
    intro:
      "For parents of students in grades 9 to 12. Use your own email. We write back to you. Please apply by November\u00a08, 2026.",
    cta: "Start the form",
    book: "Book a 15-minute intro call",
    formTitle: "Application",
    formIntro: "Two short sections: you, then your child. The résumé can be a PDF or Word file, up to 2\u00a0MB.",
    emailInstead: "If the form does not send, email",
    submit: "Submit application",
    submitting: "Sending\u2026",
    successTitle: "Application received.",
    successBody: "Thank you. We will write to the parent email you entered.",
    back: "Back to the program",
    parentLegend: "Parent or guardian",
    studentLegend: "Student",
    fields: {
      parentName: "Your name",
      email: "Your email",
      phone: "Phone, WeChat, or WhatsApp",
      countryCity: "Country and city",
      studentName: "Student’s name",
      age: "Age",
      school: "School",
      grade: "Grade",
      gradePlaceholder: "Select a grade",
      interests: "Interests",
      interestsHint: "A few sentences about what your child likes to build or learn.",
      resume: "Student résumé or CV",
      resumeHint: "PDF, DOC, or DOCX. 2\u00a0MB maximum.",
      guardian: "I am this student’s parent or guardian.",
    },
    errors: {
      summary: "Please check the fields below and try again.",
      parentName: "Enter the parent or guardian’s name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number, WeChat, or WhatsApp.",
      countryCity: "Enter your country and city.",
      name: "Enter the student’s name.",
      age: "Enter an age from 12 to 20.",
      grade: "Choose a grade from 9 to 12.",
      school: "Enter the school name.",
      interests: "Write a few sentences about your child’s interests.",
      guardian: "Please confirm you are the parent or guardian.",
      resume: "Attach a résumé as a PDF, DOC, or DOCX.",
      resumeEmpty: "That file is empty. Attach a PDF, DOC, or DOCX.",
      resumeSize: "That file is over 2\u00a0MB. Please use a shorter file.",
      resumeType: "That file does not look like a PDF, DOC, or DOCX.",
      unavailable: "The form is not connected yet. Please email us and we will help.",
      unreachable: "We could not send the form. Please email us and we will help.",
      generic: "The form did not send. Please email us and we will help.",
    },
  },
};
