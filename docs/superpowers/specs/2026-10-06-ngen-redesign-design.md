# NGEN site redesign

Date: 2026-10-06. Branch: `test-juan`. Scope: every page.

Juan asked for a complete redo of ngennetwork.org, modeled on the Ivy League Entrepreneurship Conference site (ngen-five.vercel.app, the `ilec-website` repo): keep NGEN's colors, fonts and identity, use the colors more intelligently, and match the conference site's restraint and care. He chose "every page at once" and then asked for no more questions ("surprise me"), so the decisions below are made, not proposed.

## Identity

**Color: give each brand color one job.**
- Navy `#1E3460` is the ink: every headline, paragraph and button. The deeper navy `#152747` is the one dark surface (the hero panel, the pinned story panel, the closing band, the footer).
- Orange `#E35E1E` does what it does in the logo: small nodes where trails end. It appears as dots and rings, never as a fill, a rule or text. At most one orange moment per screen.
- Warm stone `#FAF7F1` (NGEN's existing page color) is the ground, with `#F2EEE7` for bands and a near-white paper for cards.
- Muted text is navy mixed into stone (`#5B6B89`, 5:1 on stone), so the whole site reads as one ink.

**Type: NGEN's own pair, played quietly.**
- Albert Sans (NGEN's heading face) for headlines, names and big figures. Sentence case, one weight, tight tracking. The heavy all-caps titles are gone.
- Figtree (NGEN's text face) for everything read or clicked, at 400 and 500.
- Codec Pro is dropped. The bundled file carries Zetafonts' personal, non-commercial license, which excludes webfont use. The logo is the official PNG, so nothing needs it. If NGEN buys the web license, it can become the headline face by changing one variable.
- Marck Script (one signature) is dropped. The founders' letter ends on their names in the text face.

**Signature object: the trail map.** NGEN's mark is a mountain drawn in lines, with trails branching down to orange nodes. The site's one drawn object is that mountain, traced from the official PNG into centerlines:
- In the home hero it draws itself on the navy panel. The ridge comes first, then the trails, then each node lights orange.
- In the programs section, each trail stands for one way up, and pointing at a program lights its trail and node.

This is an illustration in the brand's language, not a redrawn logo. The logo itself is always the official file.

## Structure

The nav, borrowed from the conference site:
- **At the top:** the full NGEN logo on the left, the links in a frosted tray, and one action.
- **On scroll:** it lifts into a floating frosted pill with the mountain mark alone.
- **Links:** Programs, Events, Capital, Impact, About.
- **Action:** "Upcoming events".

The footer is deep navy:
- **Brand column:** the white logo and the mission line.
- **Link columns:** pages, get involved (Partner, Donate, Contact) and follow (Luma, LinkedIn, Instagram).
- **Legal:** the 501(c)(3) line with the EIN.

Every inner page opens with the same header shell:
- **Fixed for every page:** the headline's face, size and position, and the intro with at most one action under it.
- **Different for every page:** the visual on the right, drawn from real content.

### Pages

| Route | What it holds |
|---|---|
| `/` | The sections below |
| `/programs` | The four programs as stacked statements with their photos, and Capital Network for actively raising founders |
| `/programs/[slug]` | One template: description, who it's for, how to apply (the real portals), the program's photo. Trailblazers adds past speakers and the film |
| `/events` | The Luma calendar, email alerts, where each program applies, and the FAQ |
| `/capital-network/founders`, `/investors` | The Tally forms, each set beside a short explanation. Founders get the tiers; investors get the three steps |
| `/impact` | The full record: the figures with what each means, every startup with its press, and all 15 universities |
| `/about` | The founders' letter set like a letter, the founders photo, and the team (real people only, from LinkedIn) |
| `/partner` | Why partner, ways to partner, past supporters in one ink, and the email |
| `/donate` | Where gifts go, the Zeffy form, and the 501(c)(3) line |
| `/contact` | A dark header that fills the screen: the email, plus topics that pre-fill a subject |
| `/startup-challenge` | Same content in the new system; sample photos replaced with real NGEN photos where they exist |
| `/admin/*` | Unchanged behavior, restyled onto the new tokens |

These routes now redirect to `/about`: `/about/mission-story` and `/about/team`.

### Home, top to bottom

1. **Hero.** A split screen that fits one viewport.
   - Left, on stone: a kicker with an orange node ("The Ivy League entrepreneurship network"), the headline "Where students meet, build, and raise capital.", NGEN's line ("NGEN connects the next generation of founders across the Ivy League and top universities."), "Upcoming events" plus "Partner with us".
   - Right, the navy panel: the trail map drawing itself, and a floating card for the next flagship (the Ivy League Entrepreneurship Conference, April 17, 2027, New York City, days away, presented by NGEN, linking to its site).
2. **Strip.** "Students from": the 15 universities in one ink, in an even grid (no marquee).
3. **Mission.** Gabriela's model.
   - Left: the headline "From first idea to funded startup.", body, the mission line, and one button.
   - Right: the figures, aligned to the left column's rows. $30M+ is the dominant figure; 20,000, 15 and $500K+ are smaller proof.
4. **Programs.** The trail map as a diagram. Four programs on the left, each lighting its trail on the right.
5. **Story.** The pinned split scroll from the conference site.
   - The steps: a group chat across three campuses, then the first Trailblazers in New York (100+ students), then incorporation as a 501(c)(3), then 18 events in three years, then the Ivy League Entrepreneurship Conference.
   - No figure repeats the mission section's.
6. **Founders who came through.** The six startups, with team photos (greyscale until hovered), what they raised, and the press link.
7. **Past speakers.** Portraits that open a bio dialog. Nine real speakers, the same set the conference site shows.
8. **Upcoming events.** The Luma calendar in a quiet frame, with the follow link.
9. **Back cover.** A deep navy band with two columns:
   - Students: come to an event.
   - Partners and investors: the email, plus links to Partner and Capital.

## Facts

- **Figures:** the NGEN bio Juan supplied on 2026-10-05:
  - $30M+ raised by NGEN founders
  - $500K+ from VC partners
  - 20,000 students reached
  - 15 universities
  - 18 conferences, treks and pitch competitions in three years

  These replace the conflicting $10M+, $15M+, 11 and 10 elsewhere in the repo.
- **What's cut:** every piece of invented content in the hidden pages. That's stock photos, made-up investors and judges, fake winners and host firms, the city switcher, 26 "TODO" team entries, placeholder application dates presented as real, and the missing impact report link.
- **What replaces it:** what's real, set as type. Anything only NGEN can supply is listed in the final report.
- **Speakers, team, supporters and firm logos** come from the conference site's content. Juan already verified them there.

## Motion

- **Hero:** the trail map draws once, about 2.4s, after which nodes light in sequence.
- **Hover:** the conference card leans toward the pointer.
- **Nav:** it morphs on scroll.
- **Story:** the pinned panel crossfades over about 0.95s, with steps at about 74svh.
- **Photos:** people photos rest in greyscale and return to colour on hover.
- **Reveals:** a few rise into view; no fading of everything.
- **Page changes:** a 0.25s view-transition crossfade.
- **Reduced motion:** everything respects it, and drawings render finished.

No intro film and no sound: those belong to the conference site, and NGEN's hero has its own moment.

## Code

- **Copy in one place:** all copy lives in `src/content/site.js`; program and startup records stay in `src/content/programs.js` and `src/content/startups.js`.
- **Ported from the conference site, in JS:**
  - layout: `SiteNav`, `SiteFooter`, `PageHero`, `PageSection`, `InView`, `PageLink`
  - home sections: `Journey`, `Startups`, the speaker grid, `BrandLogo`
- **Deleted:** components, data and fonts left unused by the redesign. GSAP goes once nothing imports it.
- **Kept working:**
  - the admin API and auth
  - the Apps Script newsletter
  - the Tally, Luma and Zeffy embeds
  - the program apply links
  - redirects and JSON-LD
  - the production gate in `middleware.js` (out of scope; a separate task covers its bugs)

## Verification

- `npm run lint` and `npm run build` pass.
- In the browser pane, every page at 375, 1000 and 1440px:
  - no horizontal overflow and no stranded words, using the `juan-design-taste` checks
  - the h1's top, left and size match across inner pages
  - content edges sit on the nav pill's edges
- Screenshots of the home page and a sample of inner pages.

## Pass 2 (same day): after Juan's review

Juan's notes:
- some coloring felt weird
- draw attention to the Ivy schools, or do a landscape hover with the universities' logos
- don't copy the conference site's structure: play, and show what you can do
- adjust sizes and fit things to the page

**Color.** The warm cream ground clashed with NGEN's cool navy and slate, and cream with an orange accent is itself a generated-looking default. Every neutral now comes from the navy:
- snow `#F7F8FA` is the ground
- fog `#ECEFF4` is the bands
- slate `#57647E` is muted text

Orange stays at nodes only. People photos rest in a navy duotone (`.duo`) instead of grey.

**Type.** Albert Sans alone, at 400 and 500. Albert Sans and Figtree were too alike to read as a deliberate pair. The scale is larger throughout: base 17px, small 15px, h2 up to 60px, inner h1 69px, home h1 about 90px.

**Home, rebuilt around NGEN's own material:**
1. **The Ivy range.** A full-bleed mountain range drawn in the logo's language:
   - **The eight Ivies** are the summits, each with an orange node and the logo's notch.
   - **The other seven schools** are foothills.
   - **A dashed trail** links the Ivy summits.
   - **Interaction:** pointing at (or tapping) a summit raises that school's official logo. On load the ridge draws itself, then a one-time roll call walks the Ivies.
   - **Phones:** the eight Ivies only.
2. **Statement.** "The center of gravity for student innovation." centered, standing on the range's ground color.
3. **Program index.** The names set large; pointing at one swaps the real photo beside it.
4. **Timeline.** A horizontal trail with four nodes that draws when it scrolls into view: 3, 100+, 18, 2027.
5. **Ledger.** Headline "$30M+ raised by founders who came through NGEN." Startup rows lead with the amount, with soft bands.
6. **Speaker filmstrip.** It runs off the right edge, with previous and next buttons.
7. **Upcoming.** The conference card sits beside the Luma calendar.
8. **Closing.** The Trailblazers group photo in navy duotone, under "Come to an event."

**Inner pages.**
- **Headers:** a wider headline column, at the same position on every page.
- **Section titles:** real headings, not small grey labels.
- **Impact:** lists the Ivies first and large.
- **Programs header:** a new panel photo.
- **Trail map:** retired; the range replaces it.

## Pass 3: one system, two versions, no Trailblazers

Juan asked that both versions be separated properly and fit to the margins, with no paragraph running across two screens, no odd empty space in the middle, nothing isolated in a corner, and one hierarchy carried through. He also asked that everything named Trailblazers become the Ivy League Entrepreneurship Conference, and for a third version with a darker navy and a sharper, glowing orange.

**The section system (`Section.jsx`).** Every home section is one screen on wide displays (`lg:min-h-svh`) and opens the same way:
1. the headline (first read);
2. the intro (second);
3. one row of actions grouped under it (third).

The content then runs from the left margin to the right margin. The padding and the h2 size both answer the screen's height (`--text-h2` uses `min(vw, 6.8svh)`), so all eight home sections are exactly one screen tall from 1280×800 to 1920×1080 (measured). Below that, only 1366×768 runs over, by up to 23px.
- **Hero:** the Ivy range takes whatever height the copy leaves, between 12rem and 30rem.
- **Speaker strip:** four cards per view, never cut at the margin. Portraits are 6:7 and capped at 36svh.
- **Ledger:** tighter rows, so six startups and the headline fit one screen.
- **Upcoming:** the conference card carries the motto between the name and the facts, so it has no empty middle.

**Version 3, night.** `?theme=night` (remembered in localStorage) swaps the tokens under `:root[data-theme="night"]`:
- **Ground:** snow `#050E26`, fog `#08163A`, paper `#0D1D45`.
- **Ink:** `#EEF3FF`.
- **Signal:** `#FF5A14`.

Orange glows on buttons, nodes and the conference card's edge, and the hero sky carries a blue glow at the top and an orange horizon. University logos turn white. The Luma calendar uses Luma's dark style, tinted navy with a colour-blend layer. `?theme=light` returns to version 2.

**Trailblazers → the conference.**
- Every name, link and redirect (`/programs/trailblazers` → `/programs/ivy-league-entrepreneurship-conference`).
- The flagship's motto now lives once, as `conference.motto`.
- Photos with the old Trailblazers banner are off the site: the founders photo, and DSC06459 / DSC06467.
- About now opens on NGEN's own slide (A78A2335), with the room at the first conference beside the letter.
- The startup-challenge capstone uses the DSC06488 panel.

**Lines.** `text-wrap: pretty` everywhere. Non-breaking spaces bind short final words. The conference name is set as its own lockup. A checker for stranded single words passes on every page at 375, 1000 and 1440, apart from the deliberate lockup and two long words on phones.

## Pass 4: night only, Lab to Startup, the conference's sponsorship material

Juan kept the night version only. He asked for "Lab to Startup" rather than "Lab-to-Startup Conferences", and for the conference site's sponsorship material, logos and charm on NGEN's site. This work is in `~/ngen-new` on branch `test-juan-night`. `~/ngen-website` still holds the light and night version.

**Night only.**
- The night values are the only tokens in `@theme`, with the glow rules folded into the components.
- The theme script, `?theme=` and the day logos are gone.
- `color-scheme: dark`, with theme colour `#050E26`.
- Hairlines that were hard-coded in day navy now take their colour from the ink.

**Lab to Startup.** It is the name everywhere, with slug `/programs/lab-to-startup`. `/programs/research-conferences` and `/events/research-conferences` redirect to it.

**From the conference site (ngen-five.vercel.app):**
- **Ticket:** the home conference card is the conference's "Admit one" ticket. It shows the official wordmark in white (`/logos/conference/ilec-wordmark.png`), the motto, date and place, and a perforated stub (invite-only, and the conference site). The edge glows orange.
- **Home Partners screen:** after the speakers, the sponsors page's headline and line, "Partner with us", and two logo rows (`LogoRow`), each labelled for what it is: companies that supported NGEN events, and the firms behind past speakers and alumni backers.
- **Partner page:**
  - The three-circle diagram (`MeetingDiagram`): student founders, influential leaders and sponsors meet "Face to face", hatched and glowing orange, with the three groups under it.
  - "Ways to partner" now starts with the conference's two ways (conference partner, pitch competition), and every way opens an email.

All nine home screens are exactly one screen tall from 1280×800 to 1920×1080.

**Startups (October 7).**
- **New:** Zorbe ($8M raised, backed by a16z speedrun) and Nirvana Carbon Solutions ($2M raised). Juan gave the figures; neither raise has press yet, so each links to its own site.
- **Doe:** shows "$500K raised", Y Combinator's standard deal for every company in a batch.
- **Order:** startups are listed largest raise first. Home shows the six largest; /impact shows all eight, four per row.
- **Pictures:** where a startup has no team photo, its card shows its own mark on a navy tile (`StartupPicture`).
