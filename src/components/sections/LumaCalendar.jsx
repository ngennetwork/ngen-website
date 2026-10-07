import { site } from "@/content/site";

/**
 * NGEN's Luma calendar, framed quietly, in Luma's dark style (`lt=` pins it,
 * so it never follows the visitor's OS); .luma-frame tints its grey navy.
 *
 * The phone height is deliberately short of a screen: an iframe that fills
 * the screen traps the scroll (once its list bottoms out, iOS won't hand
 * the gesture back to the page), so a visitor could never get past it.
 */
export default function LumaCalendar({ className = "", frameClassName = "h-[380px] sm:h-[600px]" }) {
  const src = site.links.lumaEmbed.replace("lt=light", "lt=dark");

  return (
    <div className={`luma-frame overflow-hidden rounded-2xl bg-paper ring-1 ring-ink/8 ${className}`}>
      <iframe
        src={src}
        title="NGEN events calendar on Luma"
        width="100%"
        loading="lazy"
        allowFullScreen
        className={`block w-full border-0 ${frameClassName}`}
      />
    </div>
  );
}
