import Link from "next/link";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Strategic Advisory", href: "/services" },
      { label: "Fleet Management", href: "/services" },
      { label: "Safety & Compliance", href: "/services" },
      { label: "Operations", href: "/services" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Book Consultation", href: "/booking" },
      { label: "Send a Message", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-input">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-semibold text-foreground">
              <span className="text-primary">RK</span>
            </Link>
            <p className="mt-3 text-sm text-foreground/40 leading-relaxed max-w-xs">
              Aerospace and aviation consultancy delivering strategic
              excellence, operational safety, and global impact.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/30 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-input flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Richard Kyereh. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
