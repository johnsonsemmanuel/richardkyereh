import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
          Terms & Conditions
        </h1>
        <p className="text-foreground/40 text-sm mb-12">Last updated: June 2026</p>

        <div className="space-y-8 text-sm text-foreground/60 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Services</h2>
            <p>
              Richard Kyereh provides aerospace and aviation consultancy services. All engagements
              are governed by a separate service agreement tailored to the specific scope of work.
              These website terms govern your use of this website only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Use of Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not
              infringe the rights of others. You may not reproduce, distribute, or modify any
              content from this website without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and analysis, is the
              intellectual property of Richard Kyereh unless otherwise stated. Unauthorized use
              is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Limitation of Liability</h2>
            <p>
              The information provided on this website is for general informational purposes only
              and does not constitute professional advice. Richard Kyereh shall not be liable for
              any damages arising from the use of or reliance on this website or its content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Booking & Cancellation</h2>
            <p>
              Consultation bookings are confirmed via email. Cancellations made less than 24 hours
              before the scheduled time may be subject to a fee. We reserve the right to reschedule
              or cancel bookings due to unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Third-Party Links</h2>
            <p>
              This website may contain links to third-party websites. We are not responsible for
              the content, privacy practices, or terms of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes will be posted on
              this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Contact</h2>
            <p>
              For questions about these terms, please contact us through the contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
