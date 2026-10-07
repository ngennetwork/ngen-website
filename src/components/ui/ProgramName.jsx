import { conference } from "@/content/site";

/**
 * A program's name for a headline. The flagship is set as its own
 * three-line lockup (Ivy League / Entrepreneurship / Conference), the way
 * the conference sets it, so "Conference" never ends up alone on a line.
 */
export default function ProgramName({ name }) {
  if (name !== conference.name) return name;
  return conference.nameLines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}
