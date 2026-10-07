export const metadata = {
  title: "Admin",
  description: "Internal NGEN admin tools for managing events and startups. Not for public use.",
  robots: {
    index: false,
    follow: false,
  },
};

// The site nav floats fixed over the top of every page, so admin content
// starts below it.
export default function AdminLayout({ children }) {
  return <div className="pt-32 pb-24">{children}</div>;
}
