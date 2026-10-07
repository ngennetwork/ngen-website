import Image from "next/image";
import { sourceOf, startups } from "@/content/startups";
import { ExternalArrow } from "@/components/ui/ExternalLink";
import { site } from "@/content/site";
import StartupPicture from "./StartupPicture";

/**
 * NGEN's startups, largest raise first: team photo (navy until pointed at;
 * the company's mark where there is no team photo yet), what they raised
 * or who backed them, one line on what they do, the founders where the
 * press names them, and the coverage itself (or their site, before any).
 * Eight fill two rows of four.
 */
export default function StartupCards({ showFounders = false }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
      {startups.map((s) => (
        <li key={s.id}>
          <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper ring-1 ring-ink/6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgb(21_39_71/0.4)]">
            <StartupPicture
              startup={s}
              sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
              className="aspect-[4/3]"
              markClassName="w-[30%]"
            >
              <span className="absolute top-3 left-3 z-[2] rounded-full bg-paper/90 px-3 py-1 text-small font-medium backdrop-blur">
                {s.badge}
              </span>
            </StartupPicture>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/8">
                  <Image
                    src={s.logo.src}
                    alt=""
                    width={s.logo.width}
                    height={s.logo.height}
                    unoptimized={s.logo.src.endsWith(".svg")}
                    className="max-h-7 w-auto max-w-8 object-contain"
                  />
                </span>
                <h3 className="font-display text-[1.5rem] leading-tight tracking-[-0.03em]">{s.name}</h3>
              </div>
              <p className="text-base text-slate">{s.description}</p>
              {showFounders && s.founders.length > 0 && (
                <p className="text-small text-slate">
                  <span className="text-ink">Founders:</span> {s.founders.join(" and ")}
                </p>
              )}
              <a
                href={sourceOf(s).href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-start gap-2 pt-4 text-small text-slate transition-colors hover:text-ink"
              >
                <span className="line-clamp-2">{sourceOf(s).title}</span>
                <ExternalArrow className="mt-1.5" />
                <span className="sr-only"> {site.labels.newTab}</span>
              </a>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
