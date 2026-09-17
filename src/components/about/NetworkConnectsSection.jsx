"use client";

const PANELS = [
  {
    number: "01",
    title: "Opportunities Digest",
    description:
      "An email built from what students post. Share something you found, or something you need for the thing you are building.",
    label: "What goes in",
    chips: [
      "Internships",
      "Venture roles",
      "Grants and hackathons",
      "Looking for beta testers",
      "Feedback on a deck",
      "Come try what I built",
      "NGEN events and deadlines",
    ],
  },
  {
    number: "02",
    title: "Peer matching",
    description:
      "Get introduced to builders at other campuses, matched on what you are working on right now.",
    label: "What people ask for",
    chips: [
      "A technical co-founder",
      "A designer",
      "A first engineer",
      "Someone who has shipped this before",
      "Just to meet other builders",
    ],
  },
];

/**
 * Homepage "How the Network Connects" — dark navy band with a left-aligned
 * pitch and two panels detailing what the network actually carries.
 */
export default function NetworkConnectsSection() {
  return (
    <section className="relative flex flex-col gap-11 overflow-hidden bg-[#2B3B5E] px-6 py-14 sm:px-20 sm:py-[84px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[250px] -left-[140px] h-[660px] w-[660px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(210,98,44,0.20) 0%, rgba(210,98,44,0) 70%)",
        }}
      />

      <div className="relative flex max-w-[780px] flex-col gap-4">
        <span className="text-[13px] font-semibold tracking-[0.16em] text-[#BDB5A5] uppercase">
          The network
        </span>
        <h2 className="text-[34px] leading-[1.08] font-extrabold tracking-[-0.025em] text-[#F4EFE5] sm:text-[48px]">
          Built by the students in it
        </h2>
        <p className="text-[19px] leading-[1.6] text-[#C3BDB2]">
          Sign up once. What runs through the network is whatever students put
          into it, so you get back roughly what you give.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-6 min-[900px]:grid-cols-2">
        {PANELS.map((panel) => (
          <div
            key={panel.number}
            className="flex flex-col gap-4 rounded-[20px] border border-[rgba(244,239,229,0.12)] p-9"
            style={{
              background:
                "linear-gradient(160deg, rgba(244,239,229,0.075) 0%, rgba(244,239,229,0.015) 100%)",
            }}
          >
            <span className="text-[13px] font-bold tracking-[0.16em] text-[#D2622C]">
              {panel.number}
            </span>
            <h3 className="text-[27px] font-bold tracking-[-0.01em] text-[#F4EFE5]">
              {panel.title}
            </h3>
            <p className="text-[17px] leading-[1.6] text-[#C3BDB2]">
              {panel.description}
            </p>
            <span className="text-[12px] font-semibold tracking-[0.13em] text-[#8E897E] uppercase">
              {panel.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {panel.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[rgba(244,239,229,0.16)] bg-[rgba(244,239,229,0.04)] px-[14px] py-[7px] text-[14px] font-medium text-[#CFC9BE]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <a
          href="https://tally.so/r/rjQVD2"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[58px] items-center justify-center rounded-full bg-[#D2622C] px-11 text-[17px] font-semibold text-white transition-colors hover:opacity-90 focus-ring-dark"
        >
          Join the Network
        </a>
        <p className="text-[15px] text-[#979186]">
          Open to active students.
        </p>
      </div>
    </section>
  );
}
