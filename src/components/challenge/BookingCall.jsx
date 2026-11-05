import ExternalLink from "@/components/ui/ExternalLink";

/** The booking action. An inline scheduler appears only when content turns embed on. */
export default function BookingCall({ booking }) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <ExternalLink href={booking.url} className="btn btn-ink">
        {booking.cta}
      </ExternalLink>
      {booking.embed ? (
        <iframe title={booking.iframeTitle} src={booking.url} className="h-[700px] w-full rounded-xl bg-paper" loading="lazy" />
      ) : null}
    </div>
  );
}
