/**
 * Previous speakers (About page, "Previous Speakers" section).
 * ----------------------------------------------------------------
 * Each speaker gets a headshot, a name/title, a short bio, and a color
 * for their info panel (kept to orange / yellow / teal per the design).
 *
 * Fields:
 *   name, title  - shown collapsed and expanded
 *   bio          - shown only when the card is expanded
 *   photo        - path under /public/speakers/
 *   panelColor   - "orange" | "yellow" | "teal"
 */

export const speakers = [
  {
    name: "Seema Hingorani",
    title: "Founder, Girls Who Invest",
    bio: "Seema R. Hingorani is the Founder and Chair of Girls Who Invest, a non-profit organization founded in 2015 and dedicated to increasing the number of women in the investment industry. She is also Managing Director at Morgan Stanley Investment Management.",
    photo: "/speakers/Copy-of-Seema-Image.jpg",
    photoPosition: "center 2%",
    photoScale: 1.05,
    panelColor: "orange",
  },
  {
    name: "Geoff Ralston",
    title: "President Emeritus, Y Combinator",
    bio: "Geoff Ralston previously served as president of Y Combinator. He created Rocketmail, which became Yahoo! Mail. At Yahoo!, he held senior roles including VP of Engineering and CPO. He later served as CEO of Lala Media, which was acquired by Apple.",
    photo: "/speakers/geoff-ralston.jpg",
    photoPosition: "center 40%",
    panelColor: "yellow",
  },
  {
    name: "Tom Gardner",
    title: "Co-Founder & CEO, The Motley Fool",
    bio: "Tom Gardner co-founded The Motley Fool, a multimedia financial services company that reaches millions of people each month through its website, books, newspaper column, radio show, television appearances, and subscription newsletter services.",
    photo: "/speakers/tom-gardner.jpg",
    photoPosition: "center 10%",
    panelColor: "teal",
  },
];
