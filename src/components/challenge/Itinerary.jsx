import InView from "@/components/motion/InView";

/**
 * The capstone week as the thing a school would actually receive: a
 * printed itinerary on paper, floating over the navy panel. Four days,
 * one line each, and the travel note where a real itinerary keeps it.
 * It stretches to the height of the column beside it, so its top meets
 * the headline and its foot meets the photo's caption.
 */
export default function Itinerary({ label, place, days, note, className = "" }) {
  return (
    <InView className={`reveal ${className}`}>
      <article
        aria-label={`${label}: ${place}`}
        className="flex h-full flex-col rounded-xl bg-paper text-ink shadow-[0_30px_60px_-20px_rgb(5_12_28/0.6),0_0_0_1px_rgb(0_0_0/0.04)]"
      >
        <header className="flex items-start justify-between gap-6 px-6 pt-6 pb-2 sm:px-8 sm:pt-8">
          <div className="flex flex-col gap-1">
            <p className="text-small text-slate">{label}</p>
            <p className="font-display text-h3">{place}</p>
          </div>
          <span aria-hidden="true" className="node mt-2" />
        </header>

        <ol className="flex flex-1 flex-col justify-around gap-2 px-6 py-4 sm:px-8">
          {days.map((day, i) => (
            <li key={day.title} className="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-x-4 py-3">
              <span className="pt-[0.3em] text-small text-slate tabular">Day {i + 1}</span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[1.375rem] leading-[1.2]">{day.title}</h3>
                <p className="text-base text-slate">{day.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="rounded-b-xl bg-fog/70 px-6 py-4 text-small text-slate sm:px-8">{note}</p>
      </article>
    </InView>
  );
}
