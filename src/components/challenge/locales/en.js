/**
 * The Start-Up Challenge: every word in one place.
 * Written for families. The fee lives here. The deadline string is the one
 * line a client can change without touching the layout.
 * Info-session dates live in src/components/challenge/sessions.js.
 */

export const en = {
  meta: {
    title: "6-Month Start-Up Challenge",
    description: "A six-month program for high school students. The fee is US$4,000 per student.",
  },
  switcherLabel: "Language",
  name: "NGEN Start-Up Challenge",
  emailSubject: "NGEN Start-Up Challenge",
  applyPath: "/startup-challenge/apply",
  deadlineLabel: "Apply by",
  deadline: "Monday, December 14, 2026",
  urgency: "The program starts in January. Only 4 to 6 students are selected for the New York trip.",
  noIdea: "No company or idea needed to apply.",

  hero: {
    title: "Students build a real startup in six\u00a0months.",
    intro:
      "From January to June 2027, students learn how a company works and build one. An Ivy League student founder is the mentor. In April, selected students spend four days in New\u00a0York.",
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
        body: "High school students in grades 9 to 12, about 14 to 18 years old. No company or idea needed to apply.",
      },
      {
        icon: "calendar",
        title: "Dates",
        body: "January to June 2027. Online each month. Selected students spend four days in New\u00a0York in April.",
      },
      {
        icon: "laptop",
        title: "Format",
        body: "Online each month from home. Four days in New\u00a0York in April for selected students.",
      },
      {
        icon: "fee",
        title: "Fee",
        body: "US$4,000 per student. Pay in full, or pay US$1,000 four times. Travel to New\u00a0York is separate.",
      },
    ],
  },

  gets: {
    title: "What students get",
    intro: "A clear plan, a real project, and adults who stay with them.",
    photo: {
      src: "/about/events/workshops.jpg",
      alt: "Students talking in a small group at an NGEN workshop",
      caption: "A small-group workshop at an NGEN event.",
      position: "50% 55%",
    },
    items: [
      { icon: "mentor", title: "A mentor for six months", body: "An Ivy League student who has built something of their own. The same mentor stays for the whole program." },
      { icon: "build", title: "A real company project", body: "An idea, a first product, and real customers. Students finish with work they can show a school." },
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
      { when: "April", title: "Make a first sale", body: "Ask someone to pay, and write down the numbers. Selected students are in New\u00a0York this month." },
      { when: "May", title: "Review the numbers", body: "Look at what happened, and decide what to keep doing." },
      { when: "June", title: "Write it up", body: "A short account of the company, for the family and the school." },
    ],
    note: "Summer with the same mentor is optional, and fully online.",
  },

  mentors: {
    title: "Mentors",
    intro:
      "Each mentor is a current student at an Ivy League university and a founder. They meet their student on a regular call and review the work before it is submitted.",
    schools: ["Brown", "Columbia", "Cornell", "Dartmouth", "Harvard", "Penn", "Princeton", "Yale"],
    schoolsNote: "Where our mentors study. NGEN is an independent nonprofit and is not part of these universities.",
    points: [
      { name: "Honest feedback", body: "The mentor says what is working and what is not." },
      { name: "The same person", body: "One mentor stays for all six months." },
    ],
    speakersTitle: "Speakers at NGEN events in New\u00a0York",
    speakersNote: "These guests have spoken at NGEN. They are not the one-to-one mentors for this program.",
  },

  capstone: {
    title: "Four days in New\u00a0York",
    introBefore: "Selected students spend four days in New\u00a0York, tied to NGEN’s",
    conferenceLabel: "Ivy League Entrepreneurship Conference",
    introAfter: "on April 17, 2027. They also join NGEN’s Founder Trek the day before, on April 16.",
    conferenceHref: "https://ivyleagueconference.org/",
    logisticsTitle: "Travel and supervision",
    logistics: [
      "Travel and hotels are not included in the US$4,000 fee. Families budget them separately.",
      "NGEN sets the schedule and stays with the group for the visits and the conference.",
      "We tell families who is travelling, the daily plan, and how we stay in touch.",
    ],
    photo: {
      src: "/about/events/founder-treks.jpg",
      alt: "Students seated at an NGEN visit, listening to a speaker on stage",
      caption: "Students at an NGEN founder visit in New\u00a0York.",
      position: "50% 45%",
    },
    itinerary: {
      label: "Day by day",
      place: "April 15–18, 2027, New\u00a0York City",
      days: [
        { when: "Apr 15", title: "Arrival and orientation", body: "Day 1. Students arrive and hear the plan for the four days." },
        { when: "Apr 16", title: "Founder Trek", body: "Day 2. Visits to startups and companies in New\u00a0York." },
        {
          when: "Apr 17",
          title: "Ivy League Entrepreneurship Conference",
          body: "Day 3. Students attend the conference.",
          href: "https://ivyleagueconference.org/",
        },
        { when: "Apr 18", title: "Wrap-up and departure", body: "Day 4. A short close, then students depart." },
      ],
      note: "Dates around the conference may shift slightly. Travel and accommodation are separate from the program fee.",
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
    intro: "One fee per student for January to June 2027.",
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
      depositWhen: "Due when a student is accepted. This holds the place.",
      payments: [
        { amount: 1000, when: "January 2027" },
        { amount: 1000, when: "February 2027" },
        { amount: 1000, when: "March 2027" },
      ],
    },
    includedTitle: "Included",
    excludedTitle: "Not included",
    included: [
      "Six months of milestones, January through June.",
      "An Ivy League student founder as mentor.",
      "A live workshop each month.",
      "Progress notes and a certificate for students who finish.",
      "The four-day New\u00a0York program in April for selected students.",
    ],
    excluded: [
      "Flights and hotels for New\u00a0York.",
      "The optional online summer.",
      "Costs a student chooses to spend on their own product.",
    ],
    eligibility: {
      title: "Who can join",
      points: [
        "Grades 9 to 12.",
        "No company or idea needed to apply.",
        "A parent or guardian applies.",
        "Online from January to June 2027, with four days in New\u00a0York in April for selected students.",
      ],
    },
    cta: "Apply for a student",
  },

  ngen: {
    title: "Who runs it",
    body: "NGEN is a 501(c)(3) nonprofit started by student leaders. We run conferences, Founder Treks and company visits.",
    raised: "raised by NGEN startups",
    reach: "students reached across the network",
    universities: "universities across the network",
    events: "conferences, Founder Treks and company visits in three years",
    more: { label: "About NGEN", href: "/about" },
  },

  check: {
    title: "Check if your student is eligible",
    intro: "Four details. The result shows as soon as you send them.",
    parentName: "Parent name",
    parentEmail: "Parent email",
    whatsapp: "WhatsApp number",
    countryCode: "Country code",
    gradeOrAge: "Student grade or age",
    gradeHint: "For example, grade 11, Form 5, or age 16.",
    submit: "Check eligibility",
    submitting: "Sending\u2026",
    eligibleTitle: "Your student is eligible.",
    eligibleBody: "Students in grades 9 to 12, or ages 14 to 18, can join. Two ways to take the next step.",
    ineligibleTitle: "Thank you. We will be in touch.",
    ineligibleBody: "This program is for students in grades 9 to 12, or ages 14 to 18. We saved your note and will write if something fits better.",
    consult: "Book a 20-minute private consultation",
    sessionTitle: "Join our online info session",
    sessionNote: "Each session is {minutes} minutes on Zoom.",
    sessionSaving: "Saving\u2026",
    sessionChosen: "You are signed up for this session.",
    sessionError: "We could not save that session. Please try again.",
    fullApply: "Or send the full application",
    orEmail: "Or email",
    errors: {
      summary: "Please check the fields below and try again.",
      parentName: "Enter the parent’s name.",
      parentEmail: "Enter a valid parent email.",
      whatsapp: "Enter a WhatsApp number, with the country code.",
      gradeOrAge: "Enter the student’s grade or age.",
      unavailable: "The form is not connected yet. Please email us and we will help.",
      unreachable: "We could not send the form. Please email us and we will help.",
      generic: "The form did not send. Please email us and we will help.",
    },
  },

  apply: {
    title: "Apply for a student",
    intro: "For families of students in grades 9 to 12. Use a parent or guardian email. We write back to that address.",
    cta: "Start the form",
    formTitle: "Application",
    formIntro: "Two short sections: the parent or guardian, then the student. The résumé can be a PDF or Word file, up to 2\u00a0MB.",
    emailInstead: "If the form does not send, email",
    copyNote: "A copy of the application is emailed to the parent and the school contact.",
    submit: "Submit application",
    submitting: "Sending\u2026",
    successTitle: "Application received.",
    successBody: "Thank you. We emailed a copy to the parent and the school contact.",
    back: "Back to the program",
    parentLegend: "Parent or guardian",
    studentLegend: "Student",
    fields: {
      parentName: "Parent name",
      email: "Parent email",
      phone: "Phone, WeChat, or WhatsApp",
      countryCity: "Country and city",
      studentName: "Student’s name",
      age: "Age",
      school: "School",
      schoolContactName: "School contact name (optional)",
      schoolContactEmail: "School contact email",
      grade: "Grade",
      gradePlaceholder: "Select a grade",
      interests: "Interests",
      interestsHint: "A few sentences about what the student likes to build or learn.",
      resume: "Student résumé or CV",
      resumeHint: "PDF, DOC, or DOCX. 2\u00a0MB maximum.",
      guardian: "I am this student’s parent or guardian.",
    },
    errors: {
      summary: "Please check the fields below and try again.",
      parentName: "Enter the parent or guardian’s name.",
      email: "Enter a valid parent email.",
      phone: "Enter a phone number, WeChat, or WhatsApp.",
      countryCity: "Enter your country and city.",
      name: "Enter the student’s name.",
      age: "Enter an age from 12 to 20.",
      grade: "Choose a grade from 9 to 12.",
      school: "Enter the school name.",
      schoolContactName: "Enter the school contact’s name, or leave this blank.",
      schoolContactEmail: "Enter the school contact’s email.",
      interests: "Write a few sentences about the student’s interests.",
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
