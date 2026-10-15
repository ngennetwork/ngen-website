import Image from "next/image";
import ExternalLink from "@/components/ui/ExternalLink";
import Todo from "@/components/ui/Todo";
import Logo from "@/components/brand/Logo";

/**
 * People as portraits in an even three-column grid, the way the
 * conference's team page sets them: the photo in NGEN's ink until pointed
 * at, with where they are (region tags) resting on it; under it the name,
 * what they work on (program tags, one line) and their LinkedIn. No titles.
 * A person without a photo yet gets their initial, or NGEN's mountain while
 * they're unnamed, never a borrowed picture.
 */
export default function TeamGrid({ people, label }) {
  return (
    <ul aria-label={label} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((p) => (
        <li key={p.id} className="group flex flex-col gap-4">
          <div className={`relative aspect-[4/5] overflow-hidden rounded-xl ${p.photo ? "duo" : "bg-paper ring-1 ring-ink/8 ring-inset"}`}>
            {p.photo ? (
              <Image
                src={p.photo.src}
                alt={p.name ?? ""}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover group-hover:scale-[1.04]"
                style={{ objectPosition: p.photo.position ?? "50% 30%" }}
              />
            ) : (
              // TODO(photo): this person's portrait.
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-[4.5rem] leading-none text-ink/20">
                {p.name ? p.name[0] : <Logo shape="mark" className="h-10 opacity-20" />}
              </span>
            )}
            <ul aria-label="Regions" className="absolute bottom-3 left-3 z-[2] flex flex-wrap gap-1.5">
              {p.regions.map((r) => (
                <li key={r} className="rounded-full bg-snow/85 px-3 py-1 text-small backdrop-blur">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-display text-h3">
              <Todo value={p.name} />
            </h3>
            <ul aria-label="Programs" className="flex flex-wrap gap-x-2 text-base text-slate">
              {p.programs.map((t, i) => (
                <li key={t} className="flex gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {t}
                </li>
              ))}
            </ul>
            {p.linkedin ? (
              <ExternalLink href={p.linkedin} className="link text-small">
                LinkedIn
              </ExternalLink>
            ) : (
              <span className="flex items-center gap-2 text-small text-slate">
                LinkedIn <Todo value={null} />
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
