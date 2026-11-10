import ExternalLink from "@/components/ui/ExternalLink";

/** A short vertical plan. Sits on a paper card so the type stays easy to read. */
export default function Timeline({ items, className = "" }) {
  return (
    <ol className={className}>
      {items.map((item, index) => (
        <li key={`${item.label}-${item.title}`} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4">
          <div className="flex flex-col items-center">
            <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-full bg-[#1c3a2a] shadow-[0_0_0_4px_rgb(28_58_42/0.14)]" />
            {index < items.length - 1 && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-ink/15" />}
          </div>
          <div className={index < items.length - 1 ? "pb-5" : ""}>
            <p className="text-small font-medium text-[#1c3a2a]">{item.label}</p>
            <h3 className="mt-1 font-display text-[1.35rem] leading-tight text-ink">
              {item.href ? (
                <ExternalLink href={item.href} className="link">
                  {item.title}
                </ExternalLink>
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-slate">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
