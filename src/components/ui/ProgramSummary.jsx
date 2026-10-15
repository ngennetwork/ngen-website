/**
 * A program's one line. A program that presents one event (Conferences:
 * the Ivy League Entrepreneurship Conference) names it first, in ink, so
 * every listing says which conference it is.
 */
export default function ProgramSummary({ program, text = program.summary }) {
  if (!program.featured) return text;
  return (
    <>
      <span className="text-ink">{program.featured}.</span> {text}
    </>
  );
}
