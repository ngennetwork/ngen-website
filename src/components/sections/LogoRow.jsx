import BrandLogo from "@/components/brand/BrandLogo";

/**
 * A labelled set of other organizations' logos, margin to margin: what the
 * set is, in one line, then the logos in equal cells between one rule above
 * and one below. Each logo is in NGEN's one ink at an equal visual area
 * (BrandLogo); where no official file exists, the name stands in.
 */
export default function LogoRow({ id, label, items }) {
  return (
    <div className="flex flex-col gap-3">
      <p id={id} className="text-small text-slate">
        {label}
      </p>
      <ul aria-labelledby={id} className="grid grid-cols-2 border-y border-ink/12 text-ink sm:grid-cols-4 xl:grid-cols-7">
        {items.map((brand) => (
          <li key={brand.name} className="flex h-[clamp(4rem,9svh,5.5rem)] items-center justify-center px-1 max-sm:last:col-span-2">
            {/* A name standing in for a missing logo stays on one line */}
            <BrandLogo brand={brand} nameClassName="text-base whitespace-nowrap" />
          </li>
        ))}
      </ul>
    </div>
  );
}
