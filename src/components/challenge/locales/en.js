/**
 * NGEN Global Fellowship: every word in one place.
 * Written for families. The deadline string is the one
 * line a client can change without touching the layout.
 * Info-session dates live in src/components/challenge/sessions.js.
 */

export const en = {
  meta: {
    title: "NGEN Global Fellowship",
    description: "A six-month startup program for students, building alongside Ivy League students. January to June 2027.",
  },
  switcherLabel: "Language",
  name: "NGEN Global Fellowship",
  emailSubject: "NGEN Global Fellowship",
  applyPath: "#request",
  deadlineLabel: "Request by",
  deadline: "Monday, December 14, 2026",
  urgency: "The program starts in January.",
  noIdea: "No company or idea is needed.",
  feesNote: "Program fees and payment options are shared during your private consultation.",
  schools: {
    label: "Founded and run by students and alumni of",
  },

  hero: {
    title: "NGEN Global Fellowship",
    eyebrow: "January — June 2027",
    tagline: "A six-month startup program for students, building alongside Ivy League students.",
    intro: "From January to June 2027, Fellows learn how a company works and build one, mentored by Ivy League students.",
    photo: {
      src: "/home/hero-ngen-new-group.jpg",
      alt: "A large group of students at NGEN’s Trailblazers conference",
      caption: "Students at an NGEN conference.",
      position: "50% 55%",
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
        body: "January to June 2027, with one milestone each month.",
      },
      {
        icon: "laptop",
        title: "Format",
        body: "One mentorship session a week with an Ivy League student mentor, plus guided work between sessions. Fellows are paired up and work as a team.",
      },
    ],
  },

  gets: {
    title: "What Fellows get",
    intro: "A clear plan, a real project, and a mentor for all six months.",
    photo: {
      src: "/about/events/Copy of DSC06515.jpg",
      alt: "A student speaking into a microphone at the NGEN Trailblazers Conference in New York",
      caption: "A student asks a question at the NGEN Trailblazers Conference.",
      position: "50% 40%",
    },
    items: [
      { icon: "mentor", title: "A mentor for six months", body: "An Ivy League student, meeting weekly through the six months." },
      { icon: "build", title: "A real company project", body: "An idea, a first product, and real customers. Fellows finish with work they can show a school." },
      { icon: "workshop", title: "Live workshops", body: "Each month an operator joins the group live and answers questions." },
      { icon: "school", title: "A record for school", body: "Teachers can follow progress. Students who finish receive a certificate. Some schools use it as a class, club, or internship credit." },
    ],
  },

  months: {
    title: "The six months",
    intro: "One milestone a month. Each one ends with something finished.",
    photo: {
      src: "/startup-challenge/speaker-conversation.jpg",
      alt: "Tom Gardner, co-founder and CEO of The Motley Fool, talking with a group of students at the NGEN Trailblazers Conference",
      caption: "Students ask questions of Tom Gardner, co-founder and CEO of The Motley Fool, at the NGEN Trailblazers Conference.",
      position: "50% 35%",
    },
    steps: [
      { when: "January", title: "Choose an idea", body: "Find a real problem and talk to people who have it." },
      { when: "February", title: "Build a product and a name", body: "A simple first version people can try, and a name for it." },
      { when: "March", title: "Tell people about it", body: "Pick one way to reach customers and read the results." },
      { when: "April", title: "Make a first sale", body: "Ask someone to pay, and write down the numbers." },
      { when: "May", title: "Review the numbers", body: "Look at what happened, and decide what to keep doing." },
      { when: "June", title: "Write it up", body: "A short account of the company, for the family and the school." },
    ],
    note: "An optional summer follow-on internship with NGEN, online.",
  },

  mentors: {
    title: "Mentors",
    intro:
      "Each mentor is an Ivy League student. They meet their Fellows each week and review the work before it is submitted.",
    schools: ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
    schoolsNote: "Where our mentors study. NGEN is an independent nonprofit and is not part of these universities.",
    points: [
      { name: "Honest feedback", body: "The mentor says what is working and what is not." },
    ],
    speakersTitle: "Speakers at NGEN events in New\u00a0York",
    speakersNote: "These guests have spoken at NGEN. They are not the one-to-one mentors for this program.",
  },

  capstone: {
    title: "Four days in New\u00a0York · the Ivy League Entrepreneurship Conference",
    introBefore: "Selected Fellows spend four days in New\u00a0York, tied to NGEN’s",
    conferenceLabel: "Ivy League Entrepreneurship Conference",
    introAfter: "on April 17, 2027. They also join NGEN’s Founder Trek the day before, on April 16.",
    conferenceHref: "https://ivyleagueconference.org/",
    logisticsTitle: "Travel and supervision",
    logistics: [
      "Travel and hotels are separate. Families budget them on their own.",
      "NGEN sets the schedule and stays with the group for the visits and the conference.",
      "We tell families who is travelling, the daily plan, and how we stay in touch.",
    ],
    photo: {
      src: "/startup-challenge/founder-trek-insight-partners.jpg",
      alt: "Students around a boardroom table at Insight Partners in New York, with the skyline in the windows and a slide reading Invest in the Future of Technology with Insight Partners",
      caption: "NGEN Founder Trek at Insight Partners, New York",
      position: "center",
    },
    itinerary: {
      label: "Day by day",
      place: "April 15–18, 2027, New\u00a0York City",
      days: [
        { when: "Apr 15", title: "Arrival and orientation", body: "Day 1. Fellows arrive and hear the plan for the four days." },
        { when: "Apr 16", title: "Founder Trek", body: "Day 2. Visits to startups and companies in New\u00a0York." },
        {
          when: "Apr 17",
          title: "Ivy League Entrepreneurship Conference",
          body: "Day 3. Fellows attend the conference.",
          href: "https://ivyleagueconference.org/",
        },
        { when: "Apr 18", title: "Wrap-up and departure", body: "Day 4. A short close, then students depart." },
      ],
      note: "Dates around the conference may shift slightly. Travel and accommodation are separate.",
    },
    ticket: {
      kicker: "Admit one",
      title: "Ivy League Entrepreneurship Conference",
      dateLabel: "Date",
      date: "April 17, 2027",
      trekLabel: "Founder Trek",
      trek: "April 16, 2027",
      by: "Presented by NGEN",
    },
  },

  gallery: {
    title: "Past NGEN events",
    intro: "Conferences, workshops, and visits.",
    lead: {
      src: "/about/events/conferences.jpg",
      alt: "Three people on a panel at an NGEN conference",
      caption: "A panel at an NGEN conference.",
    },
    photos: [
      {
        src: "/startup-challenge/student-founder-summit-sf.jpg",
        alt: "Students gathered in a bright loft with green sofas at the Student Founder Summit in San Francisco",
        caption: "Student Founder Summit, San Francisco",
      },
      {
        src: "/startup-challenge/keynote-geoff-ralston.jpg",
        alt: "Geoff Ralston, former President of Y Combinator, in a keynote conversation, with his portrait on the screen",
        caption: "Keynote with Geoff Ralston, former President of Y Combinator",
      },
      {
        src: "/startup-challenge/spacetech-workshop.jpg",
        alt: "Three students with NGEN badges looking at a laptop during a workshop at the NGEN Spacetech Conference in New York",
        caption: "Workshop at the NGEN Spacetech Conference, New York",
      },
      {
        src: "/startup-challenge/spacetech-session.jpg",
        alt: "An audience seated for a session at the NGEN Trailblazers Conference in New York, with the Trailblazers title on the screen",
        caption: "Conference session at the NGEN Trailblazers Conference, New York",
      },
    ],
  },

  join: {
    title: "Who can join",
    points: [
      "Grades 9 to 12.",
      "No company or idea is needed.",
      "A parent or guardian makes the request.",
      "Online from January to June 2027.",
    ],
    cta: "Request a consultation",
  },

  ngen: {
    title: "Who runs it",
    body: "NGEN is the Ivy League entrepreneurship network. Founded by student leaders at Princeton, Penn and Brown and run by Ivy League students and alumni, it brings student founders together through conferences, treks and company visits. NGEN is a 501(c)(3) nonprofit, independent of the universities.",
    raised: "raised by NGEN startups",
    reach: "students reached across the network",
    partners: "put into students and programs by NGEN’s VC partners",
    events: "conferences, treks and company visits in three years",
    more: { label: "About NGEN", href: "/" },
  },


  apply: {
    title: "Request a consultation",
    intro: "For families of students in grades 9 to 12, about 14 to 18. Use a parent or guardian email. We write back to that address.",
    cta: "Request a consultation",
    formTitle: "Request a consultation",
    formIntro: "A few details. We follow up from here.",
    emailInstead: "If the form does not send, email",
    reassure: "We will reply within two business days to arrange a private consultation.",
    submit: "Send request",
    submitting: "Sending\u2026",
    successTitle: "Request received.",
    successBody: "Thank you. We will reply within two business days to arrange a private consultation.",
    fields: {
      parentName: "Parent name",
      email: "Parent email",
      phone: "WhatsApp or phone (optional)",
      gradeOrAge: "Student grade or age",
      gradePlaceholder: "e.g. Grade 11, Form 5, or age 16",
      note: "Anything you would like us to know",
    },
    errors: {
      summary: "Please check the fields below and try again.",
      parentName: "Enter the parent or guardian’s name.",
      email: "Enter a valid parent email.",
      gradeOrAge: "Enter the student’s grade or age.",
      note: "Please keep this note under 2,000 characters.",
      unavailable: "The form is not connected yet. Please email us and we will help.",
      unreachable: "We could not send the form. Please email us and we will help.",
      generic: "The form did not send. Please email us and we will help.",
    },
  },
};
