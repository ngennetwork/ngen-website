import { site } from "@/content/site";

/**
 * NGEN's mailing address, from site.address. The street and the suite stay
 * together when a narrow column wraps the line.
 */
export default function MailingAddress({ className = "" }) {
  const { street, city, region, postalCode } = site.address;
  const suiteAt = street.lastIndexOf(" STE ");
  const head = suiteAt === -1 ? street : street.slice(0, suiteAt);
  const suite = suiteAt === -1 ? null : street.slice(suiteAt + 1);

  return (
    <address className={`not-italic ${className}`}>
      <span className="whitespace-nowrap">{head}</span>
      {suite ? (
        <>
          {" "}
          <span className="whitespace-nowrap">{suite}</span>
        </>
      ) : null}
      <br />
      <span className="whitespace-nowrap">
        {city}, {region} {postalCode}
      </span>
    </address>
  );
}
