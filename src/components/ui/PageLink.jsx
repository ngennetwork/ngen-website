import Link from "next/link";

/** next/link tagged for the page cross-fade. */
export default function PageLink(props) {
  return <Link transitionTypes={["page"]} {...props} />;
}
