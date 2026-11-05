import PageLink from "@/components/ui/PageLink";
import { challenge } from "@/components/challenge/content";
import { formatMoney } from "@/components/challenge/money";

const SECTION = "wrap py-[clamp(5rem,10vw,8rem)]";

export default function Pricing() {
  const { pricing, applyPath } = challenge;
  const { payInFull, installment } = pricing;
  const installmentTotal = installment.deposit + installment.payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-snow">
      <div className={SECTION}>
        <div className="mb-12 flex max-w-[40rem] flex-col gap-5">
          <h2 id="pricing-title" className="font-display text-h2">
            {pricing.title}
          </h2>
          <p className="text-lead text-slate">{pricing.intro}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="flex flex-col gap-6 rounded-xl bg-paper p-6 ring-1 ring-ink/10 sm:p-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-small text-slate">{payInFull.name}</h3>
              <p className="font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tracking-[-0.03em] tabular">
                {formatMoney(payInFull.amount)}
              </p>
              <p className="text-small text-slate">{pricing.per}</p>
            </div>
            <p className="mt-auto border-t border-ink/10 pt-5 text-base text-slate">{payInFull.detail}</p>
          </article>

          <article className="flex flex-col gap-6 rounded-xl bg-paper p-6 ring-1 ring-ink/10 sm:p-8">
            <div className="flex flex-col gap-3">
              <h3 className="text-small text-slate">{installment.name}</h3>
              <p className="font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tracking-[-0.03em] tabular">
                {formatMoney(installmentTotal)}
              </p>
              <p className="text-small text-slate">{pricing.per}</p>
            </div>
            <ul className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-5">
              <li className="flex items-baseline justify-between gap-4 text-base">
                <span>
                  <span className="text-ink">{installment.depositLabel}</span>
                  <span className="mt-1 block text-small text-slate">{installment.depositWhen}</span>
                </span>
                <span className="shrink-0 tabular">{formatMoney(installment.deposit)}</span>
              </li>
              {installment.payments.map((payment) => (
                <li key={payment.when} className="flex items-baseline justify-between gap-4 text-base">
                  <span className="text-slate">{payment.when}</span>
                  <span className="shrink-0 tabular">{formatMoney(payment.amount)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

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
