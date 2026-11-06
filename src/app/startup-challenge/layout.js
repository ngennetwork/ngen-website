export default function StartupChallengeLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* CJK files are large, so they load on this program only, not site-wide. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500&family=Noto+Sans+TC:wght@400;500&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
