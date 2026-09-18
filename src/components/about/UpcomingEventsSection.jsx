import { SectionHeader } from "@/components/ui";

const LUMA_HREF = "https://luma.com/ngen";

/**
 * Homepage "Upcoming Events" — Luma calendar embed. id="events" so the
 * header's Apply button can anchor straight here.
 */
export default function UpcomingEventsSection() {
  return (
    <section id="events" className="scroll-mt-20 bg-bg py-16 md:py-20">
      <div className="container-page">
        <SectionHeader title="Upcoming Events" align="center" />

        <p className="mt-4 text-center text-body">
          <a
            href={LUMA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent-ink hover:underline"
          >
            Follow our events calendar on Luma →
          </a>
        </p>
        <p className="mt-1 text-center text-xs text-text-muted">
          Enter your email for new event notifications. No account needed.
        </p>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* lt=light pins the embed to the light theme — without it, it follows
              the visitor's OS dark mode and goes dark on our cream page.
              Add &compact=1 for the condensed list layout. */}
          <iframe
            src="https://luma.com/embed/calendar/cal-WtngTovCXlKVWHM/events?lt=light"
            width="100%"
            height="600"
            frameBorder="0"
            style={{ border: "1px solid #bfcbda88", borderRadius: "4px" }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            className="min-h-[420px] sm:min-h-[600px]"
          />
        </div>
      </div>
    </section>
  );
}
