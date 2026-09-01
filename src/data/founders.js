/**
 * Co-founders (About page, Mission section, Beat 5 — the photo with
 * arrows pointing to each founder).
 * --------------------------------------------------------------------
 * Fields:
 *   name     - founder's first name
 *   school   - university they represent
 *   position - { x, y } as percentages (0-100) of the photo's width/
 *              height, marking where that founder stands in the photo.
 *              The arrow/callout line is drawn from the label to this
 *              point. Adjust these once the real photo is in place —
 *              open the photo, estimate roughly where each person's
 *              face is as a % across and down the image, and set x/y.
 *   labelSide - "left" or "right" — which side of the photo the name
 *              label sits on.
 *
 * TODO: the founder-to-school mapping below is NOT confirmed. We know
 * the three names (Harsha, Will, Jackson) and the three schools
 * (Penn, Yale, Princeton) but not which founder goes with which school.
 * Fix the mapping in one place by editing the `school` value below —
 * it will update everywhere this data is used.
 */

export const founders = [
  {
    name: "Harsha",
    school: "TODO: school not confirmed (Penn, Yale, or Princeton)",
    position: { x: 30, y: 40 },
    labelSide: "left",
    isPlaceholder: true,
  },
  {
    name: "Will",
    school: "TODO: school not confirmed (Penn, Yale, or Princeton)",
    position: { x: 50, y: 35 },
    labelSide: "right",
    isPlaceholder: true,
  },
  {
    name: "Jackson",
    school: "TODO: school not confirmed (Penn, Yale, or Princeton)",
    position: { x: 70, y: 40 },
    labelSide: "right",
    isPlaceholder: true,
  },
];
