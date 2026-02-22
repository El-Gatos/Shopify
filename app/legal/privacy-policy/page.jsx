import LegalLayout, { Section, P, Ul } from '../LegalLayout';

export const metadata = { title: 'Privacy Policy | Urban Utensil' };

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 1, 2025">

      <Section title="1. Information We Collect">
        <P>When you visit Urban Utensil, we may collect the following types of information:</P>
        <Ul items={[
          'Personal identification information (name, email address, phone number) when you create an account or place an order',
          'Billing and shipping address',
          'Payment information (processed securely through Shopify — we never store your card details)',
          'Browser type, IP address, and pages visited (collected automatically)',
          'Communication preferences and marketing opt-ins',
        ]} />
      </Section>

      <Section title="2. How We Use Your Information">
        <P>We use the information we collect to:</P>
        <Ul items={[
          'Process and fulfil your orders',
          'Send order confirmations, shipping updates, and receipts',
          'Respond to customer service enquiries',
          'Send marketing emails if you have opted in (you can unsubscribe at any time)',
          'Improve our website and product offering',
          'Comply with legal obligations',
        ]} />
      </Section>

      <Section title="3. Sharing Your Information">
        <P>We do not sell, trade, or rent your personal information to third parties. We may share your data with:</P>
        <Ul items={[
          'Shopify — our e-commerce platform and payment processor',
          'Shipping carriers (e.g. USPS, UPS, FedEx) to fulfil your orders',
          'Email marketing tools if you have opted in to our newsletter',
          'Legal authorities if required by law',
        ]} />
      </Section>

      <Section title="4. Cookies">
        <P>Our website uses cookies to enhance your browsing experience, remember your cart, and analyse site traffic. You can control cookie settings through your browser. Disabling cookies may affect certain site functionality.</P>
      </Section>

      <Section title="5. Data Retention">
        <P>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account data at any time by contacting us.</P>
      </Section>

      <Section title="6. Your Rights">
        <P>You have the right to:</P>
        <Ul items={[
          'Access the personal data we hold about you',
          'Request correction of inaccurate data',
          'Request deletion of your data',
          'Opt out of marketing communications at any time',
          'Lodge a complaint with your local data protection authority',
        ]} />
      </Section>

      <Section title="7. Contact Us">
        <P>If you have any questions about this Privacy Policy, please contact us at support@urbanutensil.com.</P>
      </Section>

    </LegalLayout>
  );
}