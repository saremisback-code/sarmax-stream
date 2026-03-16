interface LegalPageProps {
  type: 'terms' | 'privacy';
}

export function LegalPage({ type }: LegalPageProps) {
  if (type === 'terms') return <TermsOfService />;
  return <PrivacyPolicy />;
}

function TermsOfService() {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto prose-invert">
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Terms of Service</h1>
      <p className="text-xs text-muted-foreground mb-8">Last updated: March 16, 2026</p>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
          <p>By accessing or using Sarmax ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">2. Description of Service</h2>
          <p>Sarmax is a music discovery and streaming platform that provides access to music content through third-party APIs. We do not host, store, or own any of the music content available through the Service. All content is provided by and sourced from YouTube and other third-party platforms.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">3. Content Disclaimer</h2>
          <p>All music, videos, images, and related content accessible through Sarmax are the property of their respective copyright holders. Sarmax does not claim ownership over any content and operates as a front-end interface for publicly available content. We respect intellectual property rights and comply with all applicable laws.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">4. Fair Use</h2>
          <p>The Service is intended for personal, non-commercial use only. Users may not use the Service to download, redistribute, or commercially exploit any content. Any use beyond personal listening and discovery constitutes a violation of these terms.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">5. User Accounts</h2>
          <p>Account creation is optional. If you create an account, you are responsible for maintaining the confidentiality of your credentials and for all activities under your account. You must provide accurate information and promptly update it if changes occur.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">6. Prohibited Conduct</h2>
          <p>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to interfere with or disrupt the Service; (c) reverse-engineer, decompile, or create derivative works from the Service; (d) use automated systems to access the Service; (e) circumvent any content protection measures.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">7. Third-Party Services</h2>
          <p>Sarmax integrates with third-party services including YouTube API Services. By using Sarmax, you also agree to be bound by the <a href="https://www.youtube.com/t/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a> and <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">8. Disclaimer of Warranties</h2>
          <p>The Service is provided "as is" without warranties of any kind, either express or implied. We do not guarantee uninterrupted, error-free, or secure access to the Service.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">9. Limitation of Liability</h2>
          <p>In no event shall Sarmax be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">10. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the Service constitutes acceptance of any modifications.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">11. Contact</h2>
          <p>For any questions regarding these Terms of Service, please contact us through the application.</p>
        </section>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="animate-fade-in max-w-3xl mx-auto prose-invert">
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground mb-8">Last updated: March 16, 2026</p>

      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">1. Information We Collect</h2>
          <p>We may collect the following types of information: (a) Account information (email, name) if you choose to create an account; (b) Usage data such as search queries, listening history, and interactions; (c) Device information including browser type and IP address; (d) Cookies and similar tracking technologies for functionality and analytics.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
          <p>We use collected information to: (a) provide, maintain, and improve the Service; (b) personalize your experience; (c) communicate with you about the Service; (d) ensure security and prevent fraud; (e) comply with legal obligations.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">3. Third-Party Services</h2>
          <p>Sarmax uses YouTube API Services. By using our Service, you acknowledge that your use is also subject to the <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>. We encourage you to review Google's privacy practices.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">4. Data Storage & Security</h2>
          <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure. We store minimal data and do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">5. Your Rights</h2>
          <p>You have the right to: (a) access your personal data; (b) request correction or deletion of your data; (c) opt out of marketing communications; (d) request a copy of your data in a portable format. Contact us to exercise any of these rights.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">6. Cookies</h2>
          <p>We use essential cookies for functionality and may use analytics cookies to understand usage patterns. You can control cookie preferences through your browser settings.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">7. Children's Privacy</h2>
          <p>The Service is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will take steps to delete the information.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify users of significant changes through the Service. Continued use constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="font-display text-base font-semibold text-foreground mb-2">9. Contact</h2>
          <p>For privacy-related inquiries, please contact us through the application.</p>
        </section>
      </div>
    </div>
  );
}
