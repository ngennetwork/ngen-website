"use client";

import PageLink from "@/components/ui/PageLink";
import { formatUsd } from "@/components/challenge/money";

const CARD = "flex h-full flex-col gap-6 rounded-xl bg-paper p-6 text-ink shadow-[0_24px_50px_-32px_rgb(21_24_21/0.28)] ring-1 ring-ink/10";

export default function Pricing({ copy }) {
  const { pricing, applyPath, check } = copy;
  const { payInFull, installment } = pricing;
  const installmentTotal = installment.deposit + installment.payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-snow">
      <div className="wrap py-[clamp(3.5rem,7vw,5.5rem)]">
        <h2 id="pricing-title" className="max-w-[16ch] font-display text-h2">
          {pricing.title}
        </h2>
        <p className="mt-3 max-w-[40rem] text-lead text-slate">{pricing.intro}</p>

        <div className="mt-8 grid items-stretch gap-4 lg:grid-cols-2">
          <article className={CARD}>
            <div>
              <h3 className="text-small font-medium text-[#1c3a2a]">{payInFull.name}</h3>
              <p className="mt-3 font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tabular">
                {formatUsd(payInFull.amount)}
              </p>
              <p className="mt-3 text-small text-slate">{pricing.per}</p>
            </div>
            <p className="mt-auto border-t border-ink/10 pt-5 text-base leading-relaxed text-slate">{payInFull.detail}</p>
          </article>

          <article className={CARD}>
            <div>
              <h3 className="text-small font-medium text-[#1c3a2a]">{installment.name}</h3>
              <p className="mt-3 font-display text-[clamp(3rem,2rem+2vw,4rem)] leading-none tabular">
                {formatUsd(installmentTotal)}
              </p>
              <p className="mt-3 text-small text-slate">{pricing.per}</p>
            </div>
            <ul className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-5">
              <li className="flex items-baseline justify-between gap-4">
                <span>
                  <span className="font-medium">{installment.depositLabel}</span>
                  <span className="mt-1 block text-small text-slate">{installment.depositWhen}</span>
                </span>
                <span className="shrink-0 tabular">{formatUsd(installment.deposit)}</span>
              </li>
              {installment.payments.map((payment) => (
                <li key={payment.when} className="flex items-baseline justify-between gap-4 text-slate">
                  <span>{payment.when}</span>
                  <span className="shrink-0 tabular text-ink">{formatUsd(payment.amount)}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">
          <div className={CARD}>
            <h3 className="font-display text-[1.5rem]">{pricing.includedTitle}</h3>
            <ul className="flex flex-col gap-3 text-base leading-relaxed text-slate">
              {pricing.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={CARD}>
            <h3 className="font-display text-[1.5rem]">{pricing.excludedTitle}</h3>
            <ul className="flex flex-col gap-3 text-base leading-relaxed text-slate">
              {pricing.excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-h3">{pricing.eligibility.title}</h3>
          <ul className="mt-4 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2">
            {pricing.eligibility.points.map((point) => (
              <li key={point} className={`${CARD} text-base leading-relaxed`}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#eligibility" className="btn btn-ink">
            {check.title}
          </a>
          <PageLink href={applyPath} className="btn btn-ghost">
            {pricing.cta}
          </PageLink>
        </div>
      </div>
    </section>
  );
}
