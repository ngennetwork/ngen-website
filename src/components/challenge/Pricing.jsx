import PageLink from "@/components/ui/PageLink";
import { challenge } from "@/components/challenge/content";
import { formatMoney, formatPayments, splitTotal } from "@/components/challenge/money";

const SECTION = "wrap py-[clamp(5rem,10vw,8rem)]";

export default function Pricing() {
  const { pricing, applyPath } = challenge;

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-snow">
      <div className={SECTION}>
        <div className="mb-12 flex max-w-[40rem] flex-col gap-5">
          <h2 id="pricing-title" className="font-display text-h2">
            {pricing.title}
          </h2>
          <p className="text-lead text-slate">{pricing.intro}</p>
        </div>

        <ol className="grid gap-4 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <li
              key={plan.id}
              className={`flex flex-col gap-6 rounded-xl bg-paper p-6 sm:p-8 ${plan.emphasis ? "glow-card" : "ring-1 ring-ink/10"}`}
            >
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2.5 text-small text-slate">
                  {plan.emphasis && <span aria-hidden="true" className="node" />}
                  {plan.name}
                </p>
                <p className="font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tracking-[-0.03em] tabular">
                  {formatMoney(plan.price)}
                </p>
                <p className="text-small text-slate">
                  {pricing.per} · {pricing.through} {plan.deadline}
                </p>
              </div>
              <ul className="mt-auto flex flex-col gap-2.5 border-t border-ink/10 pt-5">
                {pricing.schedules.map((schedule) => (
                  <li key={schedule.parts} className="flex items-baseline justify-between gap-4 text-base">
                    <span className="text-slate">{schedule.label}</span>
                    <span className="text-right tabular">{formatPayments(splitTotal(plan.price, schedule.parts))}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[46rem] text-small text-slate">{pricing.scheduleNote}</p>

        <div className="mt-16 grid gap-y-12 lg:grid-cols-2 lg:gap-x-16">
          <div>
            <h3 className="font-display text-h3">{pricing.includedTitle}</h3>
            <ul className="mt-6 flex flex-col">
              {pricing.included.map((item) => (
                <li key={item} className="-mx-4 rounded-lg px-4 py-3 text-base text-slate odd:bg-fog">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-h3">{pricing.excludedTitle}</h3>
            <ul className="mt-6 flex flex-col">
              {pricing.excluded.map((item) => (
                <li key={item} className="-mx-4 rounded-lg px-4 py-3 text-base text-slate odd:bg-fog">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-y-8 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-3 lg:col-span-4">
            <h3 className="font-display text-h3">{pricing.prizes.title}</h3>
            <p className="font-display text-[clamp(2.75rem,2rem+2vw,3.75rem)] leading-none tracking-[-0.03em] tabular">
              {pricing.prizes.total}
            </p>
            <p className="text-base text-slate">{pricing.prizes.totalLabel}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="flex flex-col">
              {pricing.prizes.places.map((place) => (
                <li
                  key={place.place}
                  className="-mx-4 flex items-baseline justify-between gap-6 rounded-lg px-4 py-3 odd:bg-fog"
                >
                  <span className="text-lead">{place.place}</span>
                  <span className="tabular">{place.amount}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base text-slate">{pricing.prizes.note}</p>
          </div>
        </div>

        <div className="mt-16 grid gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <h3 className="font-display text-h3 lg:col-span-4">{pricing.eligibility.title}</h3>
          <ul className="flex flex-col gap-4 lg:col-span-7 lg:col-start-6">
            {pricing.eligibility.points.map((point) => (
              <li key={point} className="text-lead text-slate">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <PageLink href={applyPath} className="btn btn-ink">
            {pricing.cta}
          </PageLink>
          <a href="#book" className="btn btn-ghost">
            {pricing.book}
          </a>
        </div>
      </div>
    </section>
  );
}
