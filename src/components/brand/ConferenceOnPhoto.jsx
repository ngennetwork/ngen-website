import Image from "next/image";
import { conference } from "@/content/site";

/**
 * The conference's official wordmark, in white, resting on the foot of a
 * photo over a navy fade: how a photo says "this is the Ivy League
 * Entrepreneurship Conference". Place it inside a positioned photo frame.
 * `show` fades it in and out (the home index swaps it as you point).
 */
export default function ConferenceOnPhoto({ show = true }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-[linear-gradient(to_top,rgb(3_10_31/0.88),rgb(3_10_31/0.4)_55%,transparent)] px-7 pt-28 pb-6 transition-[opacity,transform] duration-700 ease-out ${
        show ? "opacity-100" : "translate-y-2 opacity-0"
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
