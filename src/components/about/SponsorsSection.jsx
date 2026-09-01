import { sponsors } from "@/content/sponsors";
import { SectionHeader } from "@/components/ui";

export default function SponsorsSection() {
  // Non-University sponsors only — the 11 partner schools have their own
  // honeycomb treatment in the #community section, not this sponsor wall.
  const sponsorLogos = sponsors.filter((s) => s.category !== "University");

  return (
    <section id="sponsors" className="bg-bg py-10 md:py-12">
      <div className="container-page">
        <SectionHeader title="Our Sponsors" align="center" />
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto py-4">
          {sponsorLogos.map((item) =>
            item.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- fixed optical height, no benefit from Next's raster image optimizer
              <img
                key={item.id}
                src={item.logo}
                alt={`${item.name} logo`}
                className="h-7 md:h-9 w-auto object-contain grayscale opacity-70 hover:opacity-100 transition-opacity"
              />
            ) : (
              <p key={item.id} className="text-sm font-bold text-text opacity-70">
                {item.name}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
