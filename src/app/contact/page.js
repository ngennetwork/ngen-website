import { SectionHeader, Button } from "@/components/ui";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the NGEN team about a program, a partnership, or anything else.",
};

export default function ContactPage() {
  return (
    <div className="bg-bg">
      <div className="container-page max-w-2xl py-20">
        <SectionHeader
          as="h1"
          titleClassName="text-h2 font-sans font-extrabold text-accent-ink"
          title="Get in Touch"
          subtext="Questions about a program, partnership, or anything else? Email us and we'll get back to you."
          align="center"
        >
          <div className="flex justify-center">
            <Button variant="primary" href="mailto:info@ngennetwork.org">
              info@ngennetwork.org
            </Button>
          </div>
        </SectionHeader>
      </div>
    </div>
  );
}
