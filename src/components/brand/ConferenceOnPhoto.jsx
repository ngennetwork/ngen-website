import Image from "next/image";
import { conference } from "@/content/site";

/**
 * The conference's official wordmark, in white, resting on the foot of a
 * photo over a navy fade: how a photo says "this is the Ivy League
 * Entrepreneurship Conference". Place it inside a positioned photo frame.
 * `show` swaps it in and out (the home index changes it as you point).
 */
export default function ConferenceOnPhoto({ show = true }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-ink-night/80 px-7 pt-16 pb-6 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={conference.wordmark.src}
        alt=""
        width={conference.wordmark.width}
        height={conference.wordmark.height}
        sizes="300px"
        className="h-auto w-[min(17rem,55%)] brightness-0 invert"
      />
    </div>
  );
}
