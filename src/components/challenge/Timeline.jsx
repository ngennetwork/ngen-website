/** A short vertical plan. Sits on a cream card so the type stays easy to read. */
export default function Timeline({ items, className = "" }) {
  return (
    <ol className={className}>
      {items.map((item, index) => (
        <li key={`${item.label}-${item.title}`} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4">
          <div className="flex flex-col items-center">
            <span aria-hidden="true" className="mt-1.5 size-3 shrink-0 rounded-full bg-[#ff5a14] shadow-[0_0_0_4px_rgb(255_90_20/0.18)]" />
            {index < items.length - 1 && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-[#050e26]/15" />}
          </div>
          <div className={index < items.length - 1 ? "pb-5" : ""}>
            <p className="text-small font-medium text-[#c2410c]">{item.label}</p>
            <h3 className="mt-1 font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-[#050e26]">{item.title}</h3>
            <p className="mt-2 text-[1.075rem] leading-relaxed text-[#3e4d6e]">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
