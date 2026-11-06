# Archived: /about/team

The team page is off the live site. These files are not routed. `/about/team` redirects to `/about`.

## Restore

1. Move `page.js` back to `src/app/about/team/page.js`.
2. Move `TeamGrid.jsx` back to `src/components/sections/TeamGrid.jsx`.
3. Move `team.js` back to `src/data/team.js`.
4. In `page.js`, import `leadership` from `@/data/team` and `TeamGrid` from `@/components/sections/TeamGrid`.
5. In `src/content/site.js`, give About its child again: `{ label: "Team", href: "/about/team" }`.
6. Add `"/about/team"` to `STATIC_ROUTES` in `src/app/sitemap.js`.
7. Remove the `/about/team` redirect in `next.config.mjs`.

Copy for the page is still `pages.team` in `src/content/site.js`.
