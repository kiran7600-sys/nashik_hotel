import { siteInfo } from "@/lib/content";

const footerLinks = [
  { label: "Our Story", href: "#eco-story" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve", href: "#reserve" },
  { label: "Visit", href: "#visit" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand column */}
          <div>
            <h3 className="font-heading text-2xl font-semibold text-offwhite mb-3">
              {siteInfo.name}
            </h3>
            <p className="font-heading text-sm italic text-cream/60 mb-4">
              Eco-conscious dining, rooted in intention.
            </p>
            <div className="section-divider mb-4" />
            <p className="text-cream/50 text-sm leading-relaxed">
              A pure vegetarian fine-dining experience amid lush plantations and garden seating in the heart of Nashik.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-offwhite mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-cream/60 text-sm hover:text-terracotta transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-offwhite mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${siteInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-cream/60 hover:text-terracotta transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {siteInfo.phone}
              </a>
              <p className="flex items-start gap-2 text-cream/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {siteInfo.address.full}
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center hover:bg-terracotta/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/70">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center hover:bg-terracotta/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-cream/70">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={siteInfo.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tripadvisor"
                className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center hover:bg-terracotta/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/70">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteInfo.social.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google"
                className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center hover:bg-terracotta/20 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/70">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-sage/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-xs">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs italic font-heading">
            🌿 Proudly eco-conscious since day one
          </p>
        </div>
      </div>
    </footer>
  );
}
