import Logo from "@/components/Logo";

const FOOTER_LINKS = [
  {
    label: "Donate",
    href: "https://www.zeffy.com/en-US/donation-form/donate-to-empower-entrepreneurs",
  },
  { label: "Contact", href: "mailto:info@ngennetwork.org" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-dark-deep text-on-dark">
      <div className="container-page py-8 flex flex-col items-center gap-6 text-center">
        <Logo variant="white" className="h-14 w-auto" />

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/company/ngen-network/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NGEN on LinkedIn"
            className="text-on-dark hover:text-accent-fill"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/ngennetwork/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="NGEN on Instagram"
            className="text-on-dark hover:text-accent-fill"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
          </a>
        </div>

        <nav aria-label="Footer">
          <ul className="mx-auto flex w-fit items-center gap-5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label} className="text-center">
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="focus-ring-dark text-sm text-on-dark/80 hover:text-accent-fill"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="max-w-2xl text-xs leading-relaxed text-on-dark/80">
          NextGen Entrepreneurship Network (operating as NGEN) is a registered 501(c)(3) tax-exempt
          organization (EIN: 93-2106846). Contributions are tax-deductible to the extent allowed by
          law. Copies of our Form 990 and tax-exemption application are available upon request.
        </p>

        <p className="text-xs text-on-dark/50">
          &copy; 2026 NextGen Entrepreneurship Network. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
