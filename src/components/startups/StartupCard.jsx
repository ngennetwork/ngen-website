/**
 * The one card for src/content/startups.js-shaped data — the homepage
 * "Featured Startups" grid (leaner, showFounders={false}). The outer
 * rounded/bordered card shell lives in FeaturedStartupsSection.jsx so the
 * image here can bleed full-width to the card's edges; this just renders
 * the image + padded content stack that fills that shell. `badge` renders
 * as a top-left overlay chip on the photo (e.g. a funding/traction badge).
 */

export default function StartupCard({ startup, showFounders = true, badge = null }) {
  return (
    <>
      {startup.photo && (
        <div className="relative h-48 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- team photo, arbitrary aspect ratio */}
          <img
            src={startup.photo}
            alt=""
            className="h-full w-full object-cover"
            style={{ objectPosition: startup.photoPosition || undefined }}
          />
          {badge && <div className="absolute left-3 top-3 z-10">{badge}</div>}
        </div>
      )}

      <div className="flex flex-1 flex-col items-center gap-3 p-5 text-center">
        {startup.logo && (
          <div className="flex h-14 w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- fixed optical height, no benefit from Next's raster image optimizer */}
            <img src={startup.logo} alt={`${startup.name} logo`} className="max-h-full max-w-full object-contain" />
          </div>
        )}

        <p className="font-sans font-semibold text-surface-dark">{startup.name}</p>
        <p className="text-sm text-text">{startup.tagline}</p>

        {showFounders && startup.founders.length > 0 && (
          <p className="text-sm text-text/70">{startup.founders.map((f) => f.name).join(", ")}</p>
        )}

        {startup.articleTitle && (
          <a
            href={startup.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto text-sm font-semibold text-accent underline underline-offset-2 hover:text-accent/80"
          >
            {startup.articleTitle}
          </a>
        )}
      </div>
    </>
  );
}
