import PageLink from "@/components/ui/PageLink";

/** The Capital Network's two sides, as one quiet segmented switch. */
export default function CapitalSwitch({ current }) {
  const items = [
    { key: "founders", label: "For founders", href: "/capital-network/founders" },
    { key: "investors", label: "For investors", href: "/capital-network/investors" },
  ];
  return (
    <nav aria-label="Capital Network" className="inline-flex rounded-xl bg-ink/6 p-1">
      {items.map((item) => (
        <PageLink
          key={item.key}
          href={item.href}
          aria-current={current === item.key ? "page" : undefined}
          className="rounded-lg px-3.5 py-2 text-small text-ink/70 transition-colors hover:text-ink aria-[current=page]:bg-paper aria-[current=page]:text-ink aria-[current=page]:shadow-[0_1px_2px_rgb(21_39_71/0.12)]"
        >
          {item.label}
        </PageLink>
      ))}
    </nav>
  );
}
