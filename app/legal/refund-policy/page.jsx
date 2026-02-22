import LegalLayout, { Section, P, Ul } from '../LegalLayout';

export const metadata = { title: 'Refund Policy | Urban Utensil' };

export default function RefundPolicy() {
  return (
    <LegalLayout title="Refund Policy" lastUpdated="January 1, 2025">

      <Section title="Our Guarantee">
        <P>We want you to love what you ordered. If something isn't right, we're here to make it right. All items are eligible for a return or exchange within 30 days of delivery.</P>
      </Section>

      <Section title="Eligibility">
        <P>To be eligible for a return, your item must be:</P>
        <Ul items={[
          'Returned within 30 days of the delivery date',
          'Unused and in the same condition you received it',
          'In the original packaging where possible',
        ]} />
        <P>The following are not eligible for returns: items marked as Final Sale, gift cards, or items showing clear signs of use or damage caused after delivery.</P>
      </Section>

      <Section title="How to Start a Return">
        <Ul items={[
          'Email us at support@urbanutensil.com with your order number and reason for return',
          'We\'ll respond within 1–2 business days with return instructions',
          'Ship the item back using a trackable shipping method',
          'Once received and inspected, your refund will be processed within 5–7 business days',
        ]} />
      </Section>

      <Section title="Refunds">
        <P>Approved refunds are issued to your original payment method. Processing time after we receive the item is typically 5–7 business days, though your bank may take additional time to post the credit.</P>
        <P>Original shipping charges are non-refundable unless the return is due to our error (wrong item, damaged goods, etc.).</P>
      </Section>

      <Section title="Damaged or Wrong Items">
        <P>If you received a damaged, defective, or incorrect item, please contact us within 7 days of delivery. Include a photo of the issue and your order number and we will arrange a replacement or full refund at no cost to you.</P>
      </Section>

      <Section title="Exchanges">
        <P>We do not process direct exchanges. If you'd like a different item, please return your original order for a refund and place a new order.</P>
      </Section>

      <Section title="Contact">
        <P>Questions? Email us at support@urbanutensil.com — we typically respond within one business day.</P>
      </Section>

    </LegalLayout>
  );
}