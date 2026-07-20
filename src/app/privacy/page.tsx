import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Privacy Policy
        </h1>
        <p className="text-foreground/40 text-sm mb-12">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-foreground/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly: name, email address, company name, and
              any details you share via our booking or contact forms. We also collect standard web
              analytics data (pages visited, referral source, browser type) via cookies and similar
              technologies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used solely to respond to your inquiries, process consultation
              bookings, send occasional industry insights (if you subscribe), and improve our
              website experience. We do not sell, rent, or share your personal data with third
              parties for their marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data against
              unauthorized access, alteration, disclosure, or destruction. All data transmitted
              through our website is encrypted via TLS/SSL.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Retention</h2>
            <p>
              We retain your personal data only as long as necessary to fulfill the purposes
              described in this policy, or as required by law. You may request deletion of your
              data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. You may also
              opt out of marketing communications at any time. To exercise these rights, please
              contact us through the contact page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Cookies</h2>
            <p>
              We use essential cookies for website functionality and analytics cookies to
              understand usage patterns. You can control cookie preferences through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Contact</h2>
            <p>
              For questions about this policy or your data, please reach out via our contact page
              or email us at privacy@richardkyereh.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
