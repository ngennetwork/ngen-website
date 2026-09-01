import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterSignup({
  headline = "Stay updated on student founders",
  subtext,
  variant = "light",
  className = "",
}) {
  const isDark = variant === "dark";

  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <h2 className={`font-sans text-h3 font-extrabold ${isDark ? "text-on-dark" : "text-text"}`}>
        {headline}
      </h2>
      {subtext && (
        <p className={`mt-2 ${isDark ? "text-on-dark/70" : "text-text-muted"}`}>{subtext}</p>
      )}
      <div className="mt-6">
        <NewsletterForm variant={variant} />
      </div>
    </div>
  );
}
