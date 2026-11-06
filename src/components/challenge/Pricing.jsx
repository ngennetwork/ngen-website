"use client";

import PageLink from "@/components/ui/PageLink";
import { formatUsd } from "@/components/challenge/money";

const CARD = "flex flex-col gap-6 rounded-2xl bg-[#f6f3ec] p-6 text-[#050e26] shadow-[0_22px_50px_-28px_rgb(5_14_38/0.65)] sm:p-8";

export default function Pricing({ copy }) {
  const { pricing, applyPath } = copy;
  const { payInFull, installment } = pricing;
  const installmentTotal = installment.deposit + installment.payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-snow">
      <div className="wrap py-[clamp(4.25rem,8vw,6.75rem)]">
        <h2 id="pricing-title" className="max-w-[16ch] font-display text-h2">
          {pricing.title}
        </h2>
        <p className="mt-5 max-w-[40rem] text-lead text-slate">{pricing.intro}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className={CARD}>
            <div>
              <h3 className="text-small font-medium text-[#c2410c]">{payInFull.name}</h3>
              <p className="mt-3 font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tracking-[-0.03em] tabular">
                {formatUsd(payInFull.amount)}
              </p>
              <p className="mt-2 text-small text-[#3e4d6e]">{pricing.per}</p>
            </div>
            <p className="mt-auto border-t border-[#050e26]/10 pt-5 text-[1.075rem] leading-relaxed text-[#3e4d6e]">{payInFull.detail}</p>
          </article>

          <article className={`${CARD} ring-2 ring-[#ff5a14]`}>
            <div>
              <h3 className="text-small font-medium text-[#c2410c]">{installment.name}</h3>
              <p className="mt-3 font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tracking-[-0.03em] tabular">
                {formatUsd(installmentTotal)}
              </p>
              <p className="mt-2 text-small text-[#3e4d6e]">{pricing.per}</p>
            </div>
            <ul className="mt-auto flex flex-col gap-3 border-t border-[#050e26]/10 pt-5">
              <li className="flex items-baseline justify-between gap-4">
                <span>
                  <span className="font-medium">{installment.depositLabel}</span>
                  <span className="mt-1 block text-small text-[#3e4d6e]">{installment.depositWhen}</span>
                </span>
                <span className="shrink-0 tabular">{formatUsd(installment.deposit)}</span>
              </li>
              {installment.payments.map((payment) => (
                <li key={payment.when} className="flex items-baseline justify-between gap-4 text-[#3e4d6e]">
                  <span>{payment.when}</span>
                  <span className="shrink-0 tabular text-[#050e26]">{formatUsd(payment.amount)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className={`${CARD} p-6`}>
            <h3 className="font-display text-[1.5rem]">{pricing.includedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-[1.075rem] leading-relaxed text-[#3e4d6e]">
              {pricing.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={`${CARD} p-6`}>
            <h3 className="font-display text-[1.5rem]">{pricing.excludedTitle}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-[1.075rem] leading-relaxed text-[#3e4d6e]">
              {pricing.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-h3">{pricing.eligibility.title}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pricing.eligibility.points.map((point) => (
              <li key={point} className="rounded-xl bg-[#f6f3ec] px-4 py-3 text-[1.075rem] leading-relaxed text-[#050e26]">
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
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
