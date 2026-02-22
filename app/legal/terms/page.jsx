import LegalLayout, { Section, P, Ul } from '../LegalLayout';

export const metadata = { title: 'Terms of Service | Urban Utensil' };

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 1, 2025">

      <Section title="1. Acceptance of Terms">
        <P>By accessing or using the Urban Utensil website and placing orders, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.</P>
      </Section>

      <Section title="2. Products and Pricing">
        <Ul items={[
          'We reserve the right to modify product descriptions, images, and pricing at any time without notice',
          'Prices are displayed in USD unless otherwise stated',
          'We make every effort to display product colours and details accurately, but cannot guarantee your screen will match exactly',
          'In the event of a pricing error, we reserve the right to cancel affected orders and issue a full refund',
        ]} />
      </Section>

      <Section title="3. Orders and Payment">
        <P>By placing an order you confirm that:</P>
        <Ul items={[
          'You are authorised to use the payment method provided',
          'The information you provide is accurate and complete',
          'You are at least 18 years of age',
        ]} />
        <P>We reserve the right to refuse or cancel any order at our discretion, including cases of suspected fraud or abuse.</P>
      </Section>

      <Section title="4. Intellectual Property">
        <P>All content on this website — including logos, copy, images, and design — is the property of Urban Utensil and may not be reproduced, distributed, or used without prior written permission.</P>
      </Section>

      <Section title="5. Limitation of Liability">
        <P>Urban Utensil shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability in connection with any order shall not exceed the amount paid for that order.</P>
      </Section>

      <Section title="6. Governing Law">
        <P>These Terms of Service are governed by the laws of the State of California, United States. Any disputes shall be resolved in the courts of California.</P>
      </Section>

      <Section title="7. Changes to Terms">
        <P>We may update these Terms at any time. Continued use of the site after changes are posted constitutes your acceptance of the updated Terms.</P>
      </Section>

      <Section title="8. Contact">
        <P>Questions about these Terms? Reach us at support@urbanutensil.com.</P>
      </Section>

    </LegalLayout>
  );
}