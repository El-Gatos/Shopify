import LegalLayout, { Section, P, Ul } from '../LegalLayout';

export const metadata = { title: 'Shipping Policy | Urban Utensil' };

export default function ShippingPolicy() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="January 1, 2025">

      <Section title="Processing Time">
        <P>All orders are processed within 1–3 business days after payment is confirmed. Orders placed on weekends or public holidays will begin processing the next business day.</P>
        <P>You will receive a confirmation email with tracking information once your order has shipped.</P>
      </Section>

      <Section title="Domestic Shipping (United States)">
        <Ul items={[
          'Standard Shipping (5–8 business days) — Free on orders over $50, otherwise $4.99',
          'Expedited Shipping (2–3 business days) — $12.99',
          'Express Shipping (1–2 business days) — $24.99',
        ]} />
      </Section>

      <Section title="International Shipping">
        <P>We currently ship to select international destinations. International shipping rates and delivery times are calculated at checkout based on your location.</P>
        <Ul items={[
          'Canada: 7–14 business days',
          'United Kingdom & Europe: 10–18 business days',
          'Australia & New Zealand: 12–20 business days',
        ]} />
        <P>International customers are responsible for any customs duties, taxes, or import fees imposed by their country. These charges are not included in our shipping rates.</P>
      </Section>

      <Section title="Order Tracking">
        <P>Once your order ships, you'll receive a tracking number by email. You can also log in to your Urban Utensil account to view your order status at any time.</P>
      </Section>

      <Section title="Delivery Issues">
        <P>If your order shows as delivered but you haven't received it, please:</P>
        <Ul items={[
          'Check around your property and with neighbours',
          'Allow 24–48 hours as carriers sometimes mark items delivered early',
          'Contact us at support@urbanutensil.com if the issue persists',
        ]} />
        <P>Urban Utensil is not responsible for delays caused by carriers, weather events, or customs processing beyond our control.</P>
      </Section>

      <Section title="Contact">
        <P>For shipping enquiries, reach us at support@urbanutensil.com. Please include your order number for fastest service.</P>
      </Section>

    </LegalLayout>
  );
}