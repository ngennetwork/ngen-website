/** The grid every inner section uses: its title in the margin, content in the column. */
export default function PageSection({ id, title, aside, children, className = "", tone = "snow" }) {
  const ground = tone === "band" ? "bg-fog" : "";
  return (
    <section aria-labelledby={id} className={ground}>
      <div className={`wrap py-[clamp(4rem,8vw,7rem)] ${className}`}>
        <div className="grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-1 lg:col-span-3 lg:pt-2">
            <h2 id={id} className="font-display text-[1.75rem] leading-tight tracking-[-0.025em]">
              {title}
            </h2>
            {aside}
          </div>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
